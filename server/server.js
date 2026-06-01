import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Menu from './models/Menu.js';
import Order from './models/Order.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// GET: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ----------------- MENU ROUTES -----------------
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find({ isActive: true });
    console.log(`GET /api/menu - Returning ${menuItems.length} items`);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/menu/categories', async (req, res) => {
  try {
    const categories = await Menu.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const newItem = new Menu({
      name: req.body.name || 'Test Item',
      description: req.body.description || '',
      ingredients: req.body.ingredients || '',
      category: req.body.category || 'General',
      isVeg: req.body.isVeg !== undefined ? req.body.isVeg : true,
      basePrice: parseFloat(req.body.basePrice) || 100,
      sizes: req.body.sizes || [],
      image: '',
      isActive: true,
      stockQuantity: req.body.stockQuantity || 0,
      manageStock: req.body.manageStock || false
    });

    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----------------- ORDER ROUTES -----------------
app.post('/api/orders', async (req, res) => {
  try {
    // Inventory Stock Check & Deduct logic
    const items = req.body.items || [];
    
    // Validate stock
    for (let item of items) {
      if (item._id) {
        const menuItem = await Menu.findById(item._id);
        if (menuItem && menuItem.manageStock) {
          if (menuItem.stockQuantity < item.quantity) {
            return res.status(400).json({ message: `Insufficient stock for ${menuItem.name}. Only ${menuItem.stockQuantity} left.` });
          }
        }
      }
    }

    // Deduct stock
    for (let item of items) {
      if (item._id) {
        const menuItem = await Menu.findById(item._id);
        if (menuItem && menuItem.manageStock) {
          menuItem.stockQuantity -= item.quantity;
          await menuItem.save();
        }
      }
    }

    const orderCount = await Order.countDocuments();
    
    const newOrder = new Order({
      orderNumber: `ORD-${String(orderCount + 1).padStart(4, '0')}`,
      items: items,
      customerName: req.body.customer?.name || 'Guest',
      customerNumber: req.body.customer?.number || '',
      totalAmount: req.body.total || req.body.totalAmount || 0,
      subtotal: req.body.subtotal || 0,
      tax: req.body.tax || 0,
      paymentType: req.body.paymentType || req.body.paymentMode || 'cod',
      serviceType: req.body.serviceType || 'dine-in',
      status: 'completed',
    });

    await newOrder.save();
    console.log(`✅ Order saved: ${newOrder.orderNumber}`);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ message: 'Server error while saving order.', error: error.message });
  }
});

// GET: All Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Sales Analytics
app.get('/api/orders/sales', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate || endDate) {
      query.orderDate = {};
      if (startDate) query.orderDate.$gte = new Date(startDate);
      if (endDate) query.orderDate.$lte = new Date(endDate);
    }

    const orders = await Order.find(query);

    const dailyMap = {};
    orders.forEach(o => {
      const dateStr = new Date(o.orderDate).toISOString().slice(0, 10);
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { orderCount: 0, totalSales: 0 };
      }
      dailyMap[dateStr].orderCount += 1;
      dailyMap[dateStr].totalSales += o.totalAmount || 0;
    });

    const dailySales = Object.keys(dailyMap).map(date => ({
      _id: { date },
      orderCount: dailyMap[date].orderCount,
      totalSales: dailyMap[date].totalSales,
      averageOrderValue: dailyMap[date].totalSales / dailyMap[date].orderCount
    }));

    const itemsMap = {};
    orders.forEach(o => {
      (o.items || []).forEach(i => {
        const itemName = i.name || 'Unknown';
        if (!itemsMap[itemName]) {
          itemsMap[itemName] = { totalQuantity: 0, totalRevenue: 0 };
        }
        const qty = i.quantity || 1;
        const price = i.price || 0;
        itemsMap[itemName].totalQuantity += qty;
        itemsMap[itemName].totalRevenue += qty * price;
      });
    });

    const popularItems = Object.keys(itemsMap).map(name => ({
      _id: name,
      totalQuantity: itemsMap[name].totalQuantity,
      totalRevenue: itemsMap[name].totalRevenue
    })).sort((a, b) => b.totalQuantity - a.totalQuantity);

    res.json({ dailySales, popularItems });
  } catch (error) {
    console.error('Error in sales analytics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
