/**
 * This helper is made to generate and verify OTP with the help of `sendotp` library
 * https://github.com/MSG91/sendotp-node
 */

//const speakeasy = require('speakeasy');
const SendOtp = require('sendotp');
const request = require('request');
const async = require('async');
const User = require('../models/users');
const CONSTANTS = require('../config/constants');
const userLib = require('./users');

/**
 * helper method which makes request to SMS service to send One Time Password to Users
 * @param {object} receiverDetails
 * @param {function} callback
 */

function otpMessageSender(receiverDetails, callback) {
  const otpObject = {
    method: 'POST',
    url: `http://control.msg91.com/api/sendotp.php?authkey=${
      CONSTANTS.OTP_AUTH_KEY
    }&sender=${CONSTANTS.SENDER_ID}&mobile=${
      receiverDetails.phone
    }&otp_expiry=${CONSTANTS.OTP_EXPIRY}`,
    headers: {},
    json: true,
  };

  request(otpObject, function(error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERRORS.OTP_ERROR,
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

/**
 * Verifies the otp message using secret by which the same otp is generated
 * @param {object} otpPayload
 */

function isOtpMessageVerified(otpPayload, callback) {
  const otpObject = {
    method: 'POST',
    url: `https://control.msg91.com/api/verifyRequestOTP.php?authkey=${
      CONSTANTS.OTP_AUTH_KEY
    }&mobile=${otpPayload.phone}&otp=${otpPayload.otp}`,
    headers: {},
    json: true,
  };

  request(otpObject, function(error, res, body) {
    if (error) {
      callback({
        type: CONSTANTS.ERRORS.OTP_ERROR,
        msg: 'An Error encountered, while verifying otp.',
        errorDetail: JSON.stringify(error),
      });
    } else if (body.error) {
      callback(body, null);
    } else {
      callback(null, body);
    }
  });
}

function fetchUser(bId, callback) {
  User.findOne({
    bhamashah_id: bId,
  }).exec(function(userfetchError, getuserdetails) {
    if (userfetchError) {
      callback({
        type: 'otp_error',
        msg: 'Error ehile sending OTP',
        errorDetail: userfetchError,
      });
    } else if (!getuserdetails) {
      callback({
        type: 'otp_error',
        msg: 'No such user exist',
        errorDetail: userfetchError,
      });
    } else {
      callback(null, getuserdetails);
    }
  });
}

function sendOtp(bId, callback) {
  async.waterfall(
    [
      function(waterfallcallback) {
        fetchUser(bId, function(userError, userDetail) {
          waterfallcallback(userError, userDetail);
        });
      },

      function(userDetail, waterfallcallback) {
        otpMessageSender(userDetail, function(otpError, sendOtp) {
          waterfallcallback(otpError, sendOtp);
        });
      },

      //   function(sendOtp, userDetail, waterfallcallback) {
      //     userDetail.otp = sendOtp.otp;
      //     userDetail.secret = sendOtp.secret.base32;
      //     userDetail.save(function(saveError, savedUser) {
      //       waterfallcallback(saveError, savedUser);
      //     });
      //   },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

function verifyOtp(medDetails, callback) {
  async.waterfall(
    [
      function(waterfallcallback) {
        fetchUser(medDetails.bid, function(userError, userDetail) {
          waterfallcallback(userError, userDetail);
        });
      },

      function(userDetail, waterfallcallback) {
        const otpPayload = {
          phone: userDetail.phone,
          otp: medDetails.otp,
        };
        isOtpMessageVerified(otpPayload, function(err, verified) {
          waterfallcallback(err, verified);
        });
      },

      function(verified, waterfallcallback) {
        if (verified.type === CONSTANTS.ENUMS.OTP_RESPONSE_TYPE.SUCCESS) {
          userLib.createNewRequest(medDetails, function(
            errInCreation,
            createdrequest
          ) {
            waterfallcallback(errInCreation, createdrequest);
          });
        } else {
          const errorobj = {
            type: CONSTANTS.ERRORS.OTP_ERROR,
            msg: 'Please try with valid OTP',
          };
          waterfallcallback(errorobj);
        }
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}
module.exports = {
  sendOtp: sendOtp,
  verifyOtp: verifyOtp,
};
