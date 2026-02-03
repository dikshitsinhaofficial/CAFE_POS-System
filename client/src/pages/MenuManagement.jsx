import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import axios from 'axios';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: ''
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
        category: newItem.category,
        basePrice: newItem.basePrice
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
        category: '',
        basePrice: ''
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Add Form */}
      {isAddingNew && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-purple-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Add New Menu Item</h3>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
              <input
                type="text"
                placeholder="e.g., Cappuccino"
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                placeholder="e.g., Coffee, Tea"
                value={newItem.category}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
              <input
                type="number"
                placeholder="e.g., 180"
                value={newItem.basePrice}
                onChange={(e) => setNewItem(prev => ({ ...prev, basePrice: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Describe the item..."
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows="2"
              />
            </div>
          </div>

          <button
            onClick={handleAddItem}
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center space-x-2"
          >
            <Save size={20} />
            <span>{loading ? 'Adding...' : 'Add Item'}</span>
          </button>
        </div>
      )}

      {/* Menu Items */}
      {menuItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">No Menu Items Yet</h3>
          <p className="text-gray-500 mb-6">Add your first menu item to get started</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-bold text-lg">
                  ₹{item.basePrice?.toFixed(0)}
                </span>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-all flex items-center space-x-1"
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