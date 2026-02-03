// /backend/controllers/orderController.js
import Order from "../models/Order.js";

// ✅ Create Order
export const createOrder = async (req, res, io) => {
  try {
    const order = new Order({
      ...req.body,
      status: "completed",
      orderDate: new Date(),
    });

    const savedOrder = await order.save();

    // 🔔 Emit event to all connected clients
    io.emit("order_processed", savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Sales Analytics
export const getSalesAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const matchStage = { status: "completed" };

    if (startDate && endDate) {
      matchStage.orderDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate + "T23:59:59.999Z"),
      };
    }

    const dailySales = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          },
          totalSales: { $sum: "$total" },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: "$total" },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const popularItems = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]);

    res.json({ dailySales, popularItems });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
