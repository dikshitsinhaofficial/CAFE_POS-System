// /backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getAllOrders,
  getSalesAnalytics,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// Export a function that takes Socket.IO instance
export default (io) => {
  // Create new order
  router.post("/", async (req, res) => {
    await createOrder(req, res, io);
  });

  // Get all orders
  router.get("/", getAllOrders);

  // Get sales data
  router.get("/sales", getSalesAnalytics);

  // Get order by ID
  router.get("/:id", getOrderById);

  return router;
};
