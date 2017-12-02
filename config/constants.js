module.exports = {
  MONGO_DB: {
    URI:
      process.env.MONGODB_URI ||
      //'mongodb://hack2:qwerty@ds127506.mlab.com:27506/hackathon3',
      //'mongodb://walker:rajasthan@ds155582.mlab.com:55582/hackathon3',
      'mongodb://localhost:27017/hackathon3',
  },
  OTP_AUTH_KEY: '186133AyQXQfeIYD5a1fb8a3',
  SENDER_ID: 'RAJGOV',
  OTP_EXPIRY: 20,
  ERRORS: {
    OTP_ERROR: 'OTP error',
    FETCH_ERROR: 'fetch error',
  },
  ENUMS: {
    CONDITION: {
      EMERGENCY: 'emergency',
      NORMAL: 'normal',
      EXTREME: 'extreme',
    },
    OTP_RESPONSE_TYPE: {
      SUCCESS: 'success',
      ERROR: 'error',
    },
    REQUEST_STATUS: {
      APPROVED: 'approved',
      CANCELLED: 'cancelled',
      PENDING: 'pending',
    },
  },
};
