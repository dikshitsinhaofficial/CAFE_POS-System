import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Get all active menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ isActive: true }).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new menu item
router.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    
    // Emit real-time update
    req.app.get('io').emit('menuUpdate', await MenuItem.find({ isActive: true }));
    
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // Emit real-time update
    req.app.get('io').emit('menuUpdate', await MenuItem.find({ isActive: true }));
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // Emit real-time update
    req.app.get('io').emit('menuUpdate', await MenuItem.find({ isActive: true }));
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;