var express = require('express');
var router = express.Router();
var adminLib = require('../lib/admin');
const CONSTANTS = require('../config/constants');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/pending', function(req, res, next) {
  adminLib.fetchRequest(CONSTANTS.ENUMS.REQUEST_STATUS.PENDING, function(
    errInFetch,
    fetchRequest
  ) {
    if (errInFetch) {
      res.render('500', {
        type: errInFetch.type,
        message: errInFetch.msg,
      });
    } else {
      res.send(fetchRequest);
    }
  });
});
module.exports = router;
