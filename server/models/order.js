import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  _id: { type: String },
  name: String,
  category: String,
  quantity: Number,
  price: Number,
  size: String,
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  customerName: { type: String },
  customerNumber: { type: String },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  paymentType: { type: String, default: "cod" },
  serviceType: { type: String, default: "dine-in" },
  status: { type: String, default: "completed" },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
