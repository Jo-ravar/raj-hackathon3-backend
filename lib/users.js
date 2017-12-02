const mongoose = require('mongoose');
const User = require('../models/users');
const MedRequest = require('../models/medRequest');

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
  });

  newRequest.save(function(errInSave, savedRequest) {
    callback(errInSave, savedRequest);
  });
}

module.exports = {
  addUserDetails: addUserDetails,
  createNewRequest: createNewRequest,
};
