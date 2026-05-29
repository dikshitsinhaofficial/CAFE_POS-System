import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const menuFile = path.join(dataDir, 'menu.json');
const ordersFile = path.join(dataDir, 'orders.json');

// Ensure data directory and files exist
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(menuFile)) fs.writeFileSync(menuFile, '[]');
if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, '[]');

// Utility functions
const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// GET: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ----------------- MENU ROUTES -----------------
app.get('/api/menu', (req, res) => {
  const menuItems = readData(menuFile).filter(item => item.isActive !== false);
  console.log(`GET /api/menu - Returning ${menuItems.length} items`);
  res.json(menuItems);
});

app.get('/api/menu/categories', (req, res) => {
  const menuItems = readData(menuFile).filter(item => item.isActive !== false);
  const categories = [...new Set(menuItems.map(item => item.category))];
  res.json(categories);
});

app.post('/api/menu', (req, res) => {
  try {
    const menuItems = readData(menuFile);
    const newItem = {
      _id: Date.now().toString(),
      name: req.body.name || 'Test Item',
      description: req.body.description || '',
      ingredients: req.body.ingredients || '',
      category: req.body.category || 'General',
      isVeg: req.body.isVeg !== undefined ? req.body.isVeg : true,
      basePrice: parseFloat(req.body.basePrice) || 100,
      sizes: req.body.sizes || [],
      image: '',
      isActive: true,
      createdAt: new Date(),
    };

    menuItems.push(newItem);
    writeData(menuFile, menuItems);
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/menu/:id', (req, res) => {
  try {
    const menuItems = readData(menuFile);
    const index = menuItems.findIndex(item => item._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    menuItems[index] = { ...menuItems[index], ...req.body };
    writeData(menuFile, menuItems);
    res.json(menuItems[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const menuItems = readData(menuFile);
  const index = menuItems.findIndex(item => item._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  menuItems[index].isActive = false;
  writeData(menuFile, menuItems);
  res.json({ message: 'Item deleted' });
});

// ----------------- ORDER ROUTES -----------------
app.post('/api/orders', (req, res) => {
  try {
    const orders = readData(ordersFile);
    const order = {
      _id: Date.now().toString(),
      orderNumber: `ORD-${String(orders.length + 1).padStart(4, '0')}`,
      items: req.body.items || [],
      customer: req.body.customer || { name: 'Guest', number: '' },
      totalAmount: req.body.total || req.body.totalAmount || 0,
      subtotal: req.body.subtotal || 0,
      tax: req.body.tax || 0,
      paymentType: req.body.paymentType || req.body.paymentMode || 'cod',
      serviceType: req.body.serviceType || 'dine-in',
      status: 'completed',
      orderDate: new Date(),
    };

    orders.push(order);
    writeData(ordersFile, orders);
    console.log(`✅ Order saved: ${order.orderNumber}`);
    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ message: 'Server error while saving order.' });
  }
});

// GET: All Orders
app.get('/api/orders', (req, res) => {
  const orders = readData(ordersFile);
  res.json(orders);
});

// GET: Sales Analytics
app.get('/api/orders/sales', (req, res) => {
  try {
    const orders = readData(ordersFile);
    const { startDate, endDate } = req.query;

    let filteredOrders = orders;
    if (startDate || endDate) {
      filteredOrders = orders.filter(o => {
        const orderDateStr = new Date(o.orderDate).toISOString().slice(0, 10);
        if (startDate && orderDateStr < startDate) return false;
        if (endDate && orderDateStr > endDate) return false;
        return true;
      });
    }

    const dailyMap = {};
    filteredOrders.forEach(o => {
      const dateStr = new Date(o.orderDate).toISOString().slice(0, 10);
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = {
          orderCount: 0,
          totalSales: 0
        };
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
    filteredOrders.forEach(o => {
      (o.items || []).forEach(i => {
        const itemName = i.name || 'Unknown';
        if (!itemsMap[itemName]) {
          itemsMap[itemName] = {
            totalQuantity: 0,
            totalRevenue: 0
          };
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

// --------------- SOCKET.IO (Optional) ---------------
// import http from 'http';
// import { Server } from 'socket.io';
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });
// io.on('connection', socket => {
//   console.log('⚡ Client connected:', socket.id);
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled`);
  console.log(`✅ JSON body parser enabled`);
  console.log(`✅ Data stored in: ${dataDir}`);
});
