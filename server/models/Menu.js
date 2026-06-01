import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  ingredients: { type: String, default: '' },
  category: { type: String, default: 'General' },
  isVeg: { type: Boolean, default: true },
  basePrice: { type: Number, required: true },
  sizes: { type: Array, default: [] },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  
  // Inventory tracking fields
  stockQuantity: { type: Number, default: 0 },
  manageStock: { type: Boolean, default: false }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
