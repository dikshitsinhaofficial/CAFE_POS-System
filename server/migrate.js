import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import Menu from './models/Menu.js';
import Order from './models/Order.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
const menuFile = path.join(dataDir, 'menu.json');
const ordersFile = path.join(dataDir, 'orders.json');

const migrateData = async () => {
  await connectDB();

  try {
    // Migrate Menu
    if (fs.existsSync(menuFile)) {
      const menuData = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
      if (menuData.length > 0) {
        await Menu.deleteMany(); // Clear existing
        await Menu.insertMany(menuData);
        console.log(`✅ Migrated ${menuData.length} menu items`);
      }
    }

    // Migrate Orders
    if (fs.existsSync(ordersFile)) {
      const ordersData = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
      if (ordersData.length > 0) {
        await Order.deleteMany(); // Clear existing
        const mappedOrders = ordersData.map(o => ({
          orderNumber: o.orderNumber,
          customerName: o.customer?.name || 'Guest',
          customerNumber: o.customer?.number || '',
          items: o.items || [],
          totalAmount: o.totalAmount || o.total || 0,
          subtotal: o.subtotal || 0,
          tax: o.tax || 0,
          paymentType: o.paymentType || o.paymentMode || 'cod',
          serviceType: o.serviceType || 'dine-in',
          status: o.status || 'completed',
          orderDate: o.orderDate ? new Date(o.orderDate) : new Date()
        }));
        await Order.insertMany(mappedOrders);
        console.log(`✅ Migrated ${ordersData.length} orders`);
      }
    }

    console.log('✅ Migration Complete');
    process.exit();
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
};

migrateData();
