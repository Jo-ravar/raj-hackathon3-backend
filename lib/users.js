const mongoose = require('mongoose');
const User = require('../models/users');

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

module.exports = {
  addUserDetails: addUserDetails,
};
