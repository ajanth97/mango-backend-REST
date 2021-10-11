const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hotel = new Schema(
  {
    _id: { type: String, required: true },
    hotelName: { type: String, required: true },
    rooms: { type: Number, required: true },
    features: { type: Object, required: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model("hotels", Hotel);
