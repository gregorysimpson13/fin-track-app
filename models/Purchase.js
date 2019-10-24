const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  merchant: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = Purchase = mongoose.model("purchases", PurchaseSchema);
