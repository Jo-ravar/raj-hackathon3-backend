var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.render('500', {
      type: 'Login_ERROR',
      message: 'Please fill all the details',
    });
  } else if (
    req.body.username === 'admin@rajasthan.gov.in' &&
    req.body.password === 'abc@123'
  ) {
    res.status(200).json({ message: 'Login Successful' });
  } else {
    res.render('500', {
      type: 'Login_ERROR',
      message: 'Invalid credentials',
    });
  }
});

module.exports = router;
