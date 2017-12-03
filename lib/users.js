const mongoose = require('mongoose');
const request = require('request');
const User = require('../models/users');
const MedRequest = require('../models/medRequest');
const CONSTANTS = require('../config/constants');

function addUserDetails(userObj, callback) {
  const newUser = new User({
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    phone: userObj.phone,
    bhamashah_id: userObj.bid,
    email: userObj.email,
  });

  newUser.save(function(errInSave, savedUser) {
    callback(errInSave, savedUser);
  });
}

function createNewRequest(reqObj, callback) {
  const newRequest = new MedRequest({
    medicine_details: reqObj.medicines,
    bhamashah_id: reqObj.bid,
    health_issue: reqObj.ïssue,
    condition: reqObj.condition,
    total: reqObj.total,
  });

  newRequest.save(function(errInSave, savedRequest) {
    callback(errInSave, savedRequest);
  });
}

function getNewMedicineList(searchKey, callback) {
  const getMedDetails = {
    method: 'GET',
    url: `http://www.healthos.co/api/v1/search/medicines/brands/${searchKey}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${CONSTANTS.HEALTH_BEARER_KEY}`,
    },
    json: true,
  };

  request(getMedDetails, function(error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERRORS.HEALTH_OS_ERROR,
        msg: 'An Error encountered, while sending request.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

module.exports = {
  addUserDetails: addUserDetails,
  createNewRequest: createNewRequest,
  getNewMedicineList: getNewMedicineList,
};
