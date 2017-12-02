const mongoose = require('mongoose');
const User = require('../models/users');
const CONSTANTS = require('../config/constants');
const MedRequest = require('../models/medRequest');

function fetchRequest(statusType, callback) {
  MedRequest.find({
    status: statusType,
  }).exec(function(userfetchError, getRequestDetails) {
    if (userfetchError) {
      callback({
        type: CONSTANTS.ERRORS.FETCH_ERROR,
        msg: 'Error while fetching request',
        errorDetail: userfetchError,
      });
    } else if (!getRequestDetails) {
      callback({
        type: CONSTANTS.ERRORS.FETCH_ERROR,
        msg: 'No request exist',
        errorDetail: userfetchError,
      });
    } else {
      callback(null, getRequestDetails);
    }
  });
}

module.exports = {
  fetchRequest: fetchRequest,
};
