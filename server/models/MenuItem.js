import mongoose from 'mongoose';

const sizePriceSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true }
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  basePrice: { type: Number },
  sizes: [sizePriceSchema],
  image: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MenuItem', menuItemSchema);