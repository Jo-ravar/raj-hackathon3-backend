var express = require('express');
var router = express.Router();
var userLib = require('../lib/users');
var otpLib = require('../lib/otpHandler');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addDetail', function(req, res, next) {
  userLib.addUserDetails(req.body, function(errorInFetch, fetchedInstance) {
    if (errorInFetch) {
      console.log(errorInFetch);
    }
    res.status(200).json(fetchedInstance);
  });
});

router.get('/sendOtp/:bid', function(req, res, next) {
  var bId = req.params.bid;
  otpLib.sendOtp(bId, function(errorInFetch, fetchedInstance) {
    res.status(200).json(fetchedInstance);
  });
});

router.get('/verifyOtp/:bid/:otp', function(req, res, next) {
  var bId = req.params.bid;
  var otp = req.params.otp;
  otpLib.verifyOtp(bId, otp, function(errorInFetch, fetchedInstance) {
    res.status(200).json(fetchedInstance);
  });
});
module.exports = router;
