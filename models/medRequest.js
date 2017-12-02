const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONSTANTS = require('../config/constants');
const userSchema = new Schema(
  {
    bhamashah_id: {
      type: String,
      required: true,
    },
    health_issue: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: [
        CONSTANTS.ENUMS.CONDITION.EXTREME,
        CONSTANTS.ENUMS.CONDITION.NORMAL,
        CONSTANTS.ENUMS.CONDITION.EMERGENCY,
      ],
    },
    status: {
      type: String,
      required: true,
      enum: [
        CONSTANTS.ENUMS.REQUEST_STATUS.APPROVED,
        CONSTANTS.ENUMS.REQUEST_STATUS.PENDING,
        CONSTANTS.ENUMS.REQUEST_STATUS.CANCELLED,
      ],
      default: CONSTANTS.ENUMS.REQUEST_STATUS.PENDING,
    },
    medicine_details: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MedRequest', userSchema);
