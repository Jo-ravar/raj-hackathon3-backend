const mongoose = require('mongoose');
const request = require('request');
const fetch = require('node-fetch');
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
  const defaultOptions = {
    headers: {
      Authorization:
        'Bearer 959f349c4e25a5a3136aa6134b07e7ef76c401626013d7be69e75087ef216afe',
    },
  };

  fetch(
    `http://www.healthos.co/api/v1/search/medicines/brands/${searchKey}`,
    defaultOptions
  )
    .then(results => {
      return results.json();
    })
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      callback(error);
    });
}

module.exports = {
  addUserDetails: addUserDetails,
  createNewRequest: createNewRequest,
  getNewMedicineList: getNewMedicineList,
};
