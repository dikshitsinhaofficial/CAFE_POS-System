import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, Printer, ShoppingCart, Leaf, Drumstick } from 'lucide-react';
import axios from 'axios';

const POS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
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

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const dietaryMatch = 
      dietaryFilter === 'all' || 
      (dietaryFilter === 'veg' && item.isVeg) || 
      (dietaryFilter === 'non-veg' && !item.isVeg);
    return categoryMatch && dietaryMatch;
  });

  const addToCart = (item) => {
    const cartItem = {
      id: item._id,
      menuItemId: item._id,
      name: item.name,
      price: item.basePrice,
      quantity: 1,
      isVeg: item.isVeg
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
    if (cart.length === 0) return;
    try {
      const orderData = {
        items: cart,
        customer,
        paymentType,
        serviceType,
        subtotal,
        tax,
        total,
        orderDate: new Date()
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      printReceipt();
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
          <title>Receipt - Desi Cafe</title>
          <style>
            body { font-family: 'Outfit', sans-serif; padding: 40px; color: #333; max-width: 400px; margin: auto; border: 1px solid #eee; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px dashed #eee; padding-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; }
            .total-section { margin-top: 20px; border-top: 2px solid #333; padding-top: 15px; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin:0; color:#ca8a04;">DESI CAFE</h1>
            <p style="margin:5px 0;">Order #${Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            <p style="margin:0; font-size:12px;">Date: ${new Date().toLocaleString()}</p>
          </div>
          ${cart.map(item => `
            <div class="item">
              <span>${item.name} x${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toFixed(0)}</span>
            </div>
          `).join('')}
          <div class="total-section">
            <div class="item"><span>Subtotal</span><span>₹${subtotal.toFixed(0)}</span></div>
            <div class="item"><span>GST (18%)</span><span>₹${tax.toFixed(0)}</span></div>
            <div class="item" style="font-weight:bold; font-size:18px; margin-top:10px;">
              <span>Total</span><span>₹${total.toFixed(0)}</span>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for dining with us!</p>
            <p>Visit again soon.</p>
          </div>
        </body>
      </html>
    `);
    receiptWindow.print();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar - Filters */}
      <div className="w-full lg:w-72 flex flex-col gap-6">
        {/* Dietary Filters */}
        <div className="bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
          <h2 className="text-sm font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-4">Dietary preference</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'veg', label: 'Veg', icon: Leaf, color: 'text-green-500' },
              { id: 'non-veg', label: 'Non-Veg', icon: Drumstick, color: 'text-red-500' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setDietaryFilter(type.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 ${
                  dietaryFilter === type.id 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-transparent bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                {type.icon && <type.icon size={18} className={type.color} />}
                <span className={`text-xs font-semibold mt-1 ${dietaryFilter === type.id ? 'text-primary-700 dark:text-primary-400' : 'text-surface-600 dark:text-surface-400'}`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex-1 overflow-y-auto">
          <h2 className="text-sm font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-4">Cuisines</h2>
          <div className="space-y-2">
            <button
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                  : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              All Cuisines
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div
              key={item._id}
              onClick={() => addToCart(item)}
              className="group bg-white dark:bg-surface-900 rounded-2xl p-4 border border-surface-100 dark:border-surface-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1 rounded-md border ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">₹{item.basePrice}</span>
              </div>
              <h3 className="text-lg font-bold mb-1 text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-3">
                {item.description}
              </p>
              <div className="pt-3 border-t border-surface-50 dark:border-surface-800">
                <p className="text-[10px] font-bold text-surface-400 uppercase tracking-tighter mb-1">Ingredients</p>
                <p className="text-xs text-surface-600 dark:text-surface-300 italic">
                  {item.ingredients}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex flex-col h-full overflow-hidden">
          <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="text-primary-500" size={24} />
              Current Order
            </h2>
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <div className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Guest Name"
              value={customer.name}
              onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl text-sm outline-none"
              >
                <option value="dine-in">Dine In</option>
                <option value="takeaway">Takeaway</option>
              </select>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl text-sm outline-none"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale">
                <ShoppingCart size={64} />
                <p className="mt-2 font-bold uppercase tracking-widest text-sm">Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                      <p className="font-bold text-sm text-surface-800 dark:text-surface-200">{item.name}</p>
                    </div>
                    <p className="font-bold text-primary-600 dark:text-primary-400">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-surface-700 shadow-sm hover:bg-primary-500 hover:text-white transition-all">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-surface-700 shadow-sm hover:bg-primary-500 hover:text-white transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-surface-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-5 bg-surface-50 dark:bg-surface-900 border-t border-surface-100 dark:border-surface-800 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Subtotal</span>
              <span className="font-bold">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">GST (18%)</span>
              <span className="font-bold text-red-400">+ ₹{tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black text-primary-600 dark:text-primary-400 leading-none">₹{total.toFixed(0)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={printReceipt}
                disabled={cart.length === 0}
                className="flex items-center justify-center gap-2 py-3 bg-surface-200 dark:bg-surface-800 rounded-xl font-bold hover:bg-surface-300 dark:hover:bg-surface-700 transition-all disabled:opacity-50"
              >
                <Printer size={18} />
                Print
              </button>
              <button
                onClick={processOrder}
                disabled={cart.length === 0}
                className="py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-600/30 hover:bg-primary-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;