const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      price: Number   // 🔥 snapshot price store karenge
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);