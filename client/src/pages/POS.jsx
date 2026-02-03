import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, Printer, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const POS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', mobile: '' });
  const [paymentType, setPaymentType] = useState('cash');
  const [serviceType, setServiceType] = useState('dine-in');

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item, selectedSize = null) => {
    const price = selectedSize 
      ? item.sizes.find(s => s.size === selectedSize)?.price 
      : item.basePrice;

    const cartItem = {
      id: item._id + (selectedSize || ''),
      menuItemId: item._id,
      name: item.name,
      price: price,
      size: selectedSize,
      quantity: 1
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(ci => ci.id === cartItem.id);
      if (existingItem) {
        return prevCart.map(ci =>
          ci.id === cartItem.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prevCart, cartItem];
    });
  };

  const updateQuantity = (id, change) => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const processOrder = async () => {
    try {
      const orderData = {
        items: cart,
        customer,
        paymentType,
        serviceType,
        subtotal,
        tax,
        total
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      console.log('Order processed:', response.data);
      
      // Print receipt (simulated)
      printReceipt();
      
      // Clear cart
      setCart([]);
      setCustomer({ name: '', mobile: '' });
      
      alert('Order processed successfully!');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Error processing order');
    }
  };

  const printReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { font-weight: bold; border-top: 1px solid #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Restaurant POS</h2>
            <p>Order #${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p>Customer: ${customer.name || 'Walk-in'}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
          ${cart.map(item => `
            <div class="item">
              <span>${item.name} ${item.size ? `(${item.size})` : ''} x${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toFixed(0)}</span>
            </div>
          `).join('')}
          <div class="total">
            <div class="item"><span>Subtotal:</span><span>₹${subtotal.toFixed(0)}</span></div>
            <div class="item"><span>GST (18%):</span><span>₹${tax.toFixed(0)}</span></div>
            <div class="item"><span>Total:</span><span>₹${total.toFixed(0)}</span></div>
          </div>
        </body>
      </html>
    `);
    receiptWindow.print();
  };

  return (
    <div className="h-screen flex bg-white rounded-lg shadow-xl m-4">
      {/* Sidebar - Categories */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-4 rounded-l-lg">
        <h2 className="text-xl font-bold mb-6">Categories</h2>
        <div className="space-y-2">
          <button
            className={`w-full text-left p-3 rounded-lg transition-all ${
              selectedCategory === 'all' ? 'bg-white text-purple-700' : 'hover:bg-purple-600'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedCategory === category ? 'bg-white text-purple-700' : 'hover:bg-purple-600'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main POS Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer border border-purple-100"
              onClick={() => addToCart(item)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-bold">
                  ₹{item.basePrice?.toFixed(0)}
                </span>
                {item.sizes && item.sizes.length > 0 && (
                  <select
                    className="text-xs border rounded px-2 py-1"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      if (e.target.value) {
                        addToCart(item, e.target.value);
                        e.target.value = ''; // Reset selection
                      }
                    }}
                  >
                    <option value="">Size</option>
                    {item.sizes.map(size => (
                      <option key={size.size} value={size.size}>
                        {size.size} - ₹{size.price.toFixed(0)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-96 bg-gray-50 p-6 rounded-r-lg border-l border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          <ShoppingCart className="text-purple-600" />
        </div>

        {/* Customer Details */}
        <div className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={customer.mobile}
            onChange={(e) => setCustomer(prev => ({ ...prev, mobile: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Service & Payment Type */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="digital">Digital</option>
            </select>
          </div>
        </div>

        {/* Cart Items */}
        <div className="mb-4 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg mb-2 shadow-sm">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                  <p className="text-purple-600 font-bold">₹{item.price.toFixed(0)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>₹{tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(0)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={processOrder}
            disabled={cart.length === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Process Order
          </button>
          <button
            onClick={printReceipt}
            disabled={cart.length === 0}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            <Printer size={18} />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;