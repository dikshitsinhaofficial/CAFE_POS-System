import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Leaf, Drumstick, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    ingredients: '',
    category: 'Indian',
    basePrice: '',
    isVeg: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      console.log('Fetching menu items...');
      const response = await axios.get('http://localhost:5000/api/menu');
      console.log('Menu items:', response.data);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setMenuItems([]);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      console.log('Adding item:', newItem);

      // Simple validation
      if (!newItem.name || !newItem.category || !newItem.basePrice) {
        alert('Please fill in all required fields');
        return;
      }

      const itemData = {
        name: newItem.name,
        description: newItem.description,
        ingredients: newItem.ingredients,
        category: newItem.category,
        basePrice: newItem.basePrice,
        isVeg: newItem.isVeg
      };

      console.log('Sending to server:', itemData);
      
      const response = await axios.post('http://localhost:5000/api/menu', itemData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Server response:', response.data);
      
      // Reset form
      setNewItem({
        name: '',
        description: '',
        ingredients: '',
        category: 'Indian',
        basePrice: '',
        isVeg: true
      });
      setIsAddingNew(false);
      
      // Refresh menu
      await fetchMenuItems();
      
      alert('Item added successfully!');
      
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      alert('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        await fetchMenuItems();
        alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting menu item');
      }
    }
  };

  const categoryOptions = ['Indian', 'Chinese', 'Italian', 'Sweets'];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-1">Menu Management</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">View, add, and manage your restaurant menu items</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-3 bg-surface-100 hover:bg-surface-200 dark:bg-surface-850 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl transition-all font-semibold border border-surface-200 dark:border-surface-700 text-sm"
          >
            <ArrowLeft size={16} />
            Back to POS
          </Link>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex-1 sm:flex-initial bg-primary-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary-600/30 text-sm"
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {isAddingNew && (
        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-lg mb-6 border border-primary-100 dark:border-surface-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-surface-800 dark:text-white">Add New Menu Item</h3>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Item Name *</label>
              <input
                type="text"
                placeholder="e.g., Chicken Biryani"
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-surface-300 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-800 text-surface-800 dark:text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-surface-300 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-800 text-surface-800 dark:text-white outline-none"
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Base Price (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g., 350"
                  value={newItem.basePrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, basePrice: e.target.value }))}
                  className="w-full p-3 border border-surface-300 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-800 text-surface-800 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Dietary Type *</label>
                <div className="grid grid-cols-2 gap-2 h-[48px]">
                  <button
                    type="button"
                    onClick={() => setNewItem(prev => ({ ...prev, isVeg: true }))}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                      newItem.isVeg
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'border-transparent bg-surface-50 dark:bg-surface-800 text-surface-500'
                    }`}
                  >
                    <Leaf size={14} />
                    Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem(prev => ({ ...prev, isVeg: false }))}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                      !newItem.isVeg
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        : 'border-transparent bg-surface-50 dark:bg-surface-800 text-surface-500'
                    }`}
                  >
                    <Drumstick size={14} />
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Ingredients</label>
              <input
                type="text"
                placeholder="e.g., Basmati Rice, Chicken, Saffron, Fried Onions"
                value={newItem.ingredients}
                onChange={(e) => setNewItem(prev => ({ ...prev, ingredients: e.target.value }))}
                className="w-full p-3 border border-surface-300 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-800 text-surface-800 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description</label>
              <textarea
                placeholder="Describe the item..."
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-surface-300 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white dark:bg-surface-800 text-surface-800 dark:text-white outline-none"
                rows="2"
              />
            </div>
          </div>

          <button
            onClick={handleAddItem}
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-lg"
          >
            <Save size={20} />
            <span>{loading ? 'Adding...' : 'Add Item'}</span>
          </button>
        </div>
      )}

      {/* Menu Items */}
      {menuItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-surface-900 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-300 mb-4">No Menu Items Yet</h3>
          <p className="text-surface-500 mb-6">Add your first menu item to get started</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 shadow-lg"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="bg-white dark:bg-surface-900 rounded-2xl shadow-sm p-4 border border-surface-100 dark:border-surface-800 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-md border ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-surface-800 dark:text-white">{item.name}</h3>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-sm mb-1">{item.description}</p>
              {item.ingredients && (
                <p className="text-surface-400 text-xs italic mb-3">{item.ingredients}</p>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t border-surface-100 dark:border-surface-800">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                  ₹{item.basePrice?.toFixed(0)}
                </span>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-600 text-white py-2 px-3 rounded-xl hover:bg-red-700 transition-all flex items-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManagement;