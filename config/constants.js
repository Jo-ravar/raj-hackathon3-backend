module.exports = {
  MONGO_DB: {
    URI:
      process.env.MONGODB_URI ||
      'mongodb://walker:rajasthan@ds155582.mlab.com:55582/hackathon3',
  },
  OTP_AUTH_KEY: '186133AyQXQfeIYD5a1fb8a3',
  SENDER_ID: 'RAJGOV',
  OTP_EXPIRY: 20,
};
