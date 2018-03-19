module.exports = {
  MONGO_DB: {
    URI:
      process.env.MONGODB_URI ||
      //'mongodb://hack2:qwerty@ds127506.mlab.com:27506/hackathon3',
      //'mongodb://walker:rajasthan@ds155582.mlab.com:55582/hackathon3',
      'mongodb://localhost:27017/hackathon3',
  },
  HEALTH_BEARER_KEY:
    'Bearer 959f349c4e25a5a3136aa6134b07e7ef76c401626013d7be69e75087ef216afe',
  OTP_AUTH_KEY: '186133AyQXQfeIYD5a1fb8a3',
  SENDER_ID: 'RAJGOV',
  OTP_EXPIRY: 20,
  ERRORS: {
    OTP_ERROR: 'OTP error',
    FETCH_ERROR: 'fetch error',
    HEALTH_OS_ERROR: 'health os error',
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
