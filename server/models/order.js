// /backend/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  price: Number,
  size: String,
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String },
  customerNumber: { type: String },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "Cash" },
  status: { type: String, default: "completed" },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
