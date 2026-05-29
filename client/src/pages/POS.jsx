import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, Printer, ShoppingCart, Leaf, Drumstick, Search, X, Wallet, CreditCard, Banknote } from 'lucide-react';
import axios from 'axios';

const POS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', mobile: '', address: '' });
  const [paymentType, setPaymentType] = useState('cod');
  const [serviceType, setServiceType] = useState('dine-in');
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'cart' on mobile

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
    const categoryMatch = 
      selectedCategory === 'all' || 
      item.category === selectedCategory || 
      (searchQuery.trim() !== '' && (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    const dietaryMatch = 
      dietaryFilter === 'all' || 
      (dietaryFilter === 'veg' && item.isVeg) || 
      (dietaryFilter === 'non-veg' && !item.isVeg);
    const searchMatch = 
      searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && dietaryMatch && searchMatch;
  });

  const addToCart = (item) => {
    const cartItem = {
      id: item._id,
      menuItemId: item._id,
      name: item.name,
      price: item.basePrice,
      quantity: 1,
      isVeg: item.isVeg,
      image: item.image
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

  // Calculate delivery charge if less than 600 (only when cart has items)
  const deliveryCharge = (cart.length > 0 && subtotal < 600) ? 40 : 0;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax + deliveryCharge;

  const processOrder = async () => {
    if (cart.length === 0) return;
    if (!customer.name || !customer.mobile || !customer.address) {
      alert('Please fill in Customer Name, Phone, and Address.');
      return;
    }
    try {
      const orderData = {
        items: cart,
        customer,
        paymentType,
        subtotal,
        tax,
        deliveryCharge,
        total,
        orderDate: new Date()
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      printReceipt();
      setCart([]);
      setCustomer({ name: '', mobile: '', address: '' });
      alert('Order processed successfully!');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Error processing order');
    }
  };

  const getPaymentLabel = (type) => {
    switch(type) {
      case 'wallet': return 'Wallet';
      case 'razorpay': return 'Razorpay Online (UPI/Card)';
      case 'cod': return 'Cash on Delivery (COD)';
      default: return type;
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
            <p style="margin:5px 0; font-size:12px;">Payment: ${getPaymentLabel(paymentType)}</p>
            ${customer.name ? `<p style="margin:2px 0; font-size:12px;">Customer: ${customer.name}</p>` : ''}
            ${customer.mobile ? `<p style="margin:2px 0; font-size:12px;">Phone: ${customer.mobile}</p>` : ''}
            ${customer.address ? `<p style="margin:2px 0; font-size:12px;">Address: ${customer.address}</p>` : ''}
          </div>
          ${cart.map(item => `
            <div class="item">
              <span>${item.name} x${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toFixed(0)}</span>
            </div>
          `).join('')}
          <div class="total-section">
            <div class="item"><span>Subtotal</span><span>₹${subtotal.toFixed(0)}</span></div>
            <div class="item"><span>GST (5%)</span><span>₹${tax.toFixed(0)}</span></div>
            ${deliveryCharge > 0 ? `<div class="item"><span>Delivery Charge</span><span>₹${deliveryCharge}</span></div>` : ''}
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

  const paymentMethods = [
    { id: 'wallet', label: 'Wallet', sublabel: 'Paytm · PhonePe · GPay', icon: Wallet, color: 'text-orange-500' },
    { id: 'razorpay', label: 'Razorpay Online', sublabel: 'UPI · Card · Net Banking', icon: CreditCard, color: 'text-blue-500' },
    { id: 'cod', label: 'COD', sublabel: 'Cash on Delivery', icon: Banknote, color: 'text-green-500' }
  ];

  // Helper to get item count in cart
  const getItemQtyInCart = (itemId) => {
    const found = cart.find(c => c.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] w-full pb-20 lg:pb-0 relative overflow-hidden">
      {/* Left Group (Sidebar + Menu Grid) */}
      <div className={`${activeTab === 'menu' ? 'flex' : 'hidden lg:flex'} flex-col md:flex-row gap-6 flex-1 min-w-0 h-full overflow-hidden`}>
        {/* Sidebar - Filters (Shifted to left side) */}
        <div className="w-full md:w-64 lg:w-80 flex flex-col gap-5 flex-shrink-0 overflow-y-auto lg:overflow-y-visible max-h-[35vh] md:max-h-none">
        {/* Search Input - Shifted to the top of the left sidebar */}
        <div className="bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search menu... (e.g. biryani)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-surface-400 mt-2 px-1">
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "<span className="text-primary-600 dark:text-primary-400 font-semibold">{searchQuery}</span>"
            </p>
          )}
        </div>

        {/* Dietary Filters */}
        <div className="bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
          <h2 className="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3">Dietary preference</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'veg', label: 'Veg', icon: Leaf, color: 'text-green-500' },
              { id: 'non-veg', label: 'Non-Veg', icon: Drumstick, color: 'text-red-500' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setDietaryFilter(type.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all border-2 ${
                  dietaryFilter === type.id 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-transparent bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                {type.icon && <type.icon size={16} className={type.color} />}
                <span className={`text-[11px] font-semibold mt-1 ${dietaryFilter === type.id ? 'text-primary-700 dark:text-primary-400' : 'text-surface-600 dark:text-surface-400'}`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex-1 lg:overflow-y-auto min-h-0 lg:min-h-[250px]">
          <h2 className="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3">Cuisines</h2>
          <div className="flex lg:flex-col flex-row gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1">
            <button
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
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

      {/* Main Grid (Middle/Center Grid) */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const qty = getItemQtyInCart(item._id);
            return (
              <div
                key={item._id}
                onClick={() => addToCart(item)}
                className="group bg-white dark:bg-surface-900 rounded-2xl overflow-hidden border border-surface-100 dark:border-surface-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col relative"
              >
                {/* Hover quantity overlay */}
                {qty > 0 && (
                  <div className="absolute top-2 right-2 z-10 bg-primary-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-lg border border-white">
                    Added: {qty}
                  </div>
                )}
                
                {/* Product Image */}
                <div className="relative h-40 w-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Subtle info on hover showing added quantity info */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center text-white">
                    <span className="text-sm font-black tracking-wider uppercase">
                      {qty > 0 ? `Currently in cart: ${qty}` : 'Click to add to cart'}
                    </span>
                    {qty > 0 && <span className="text-xs text-white/80 mt-1">Total: ₹{(qty * item.basePrice).toFixed(0)}</span>}
                  </div>

                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-surface-900/95 p-1.5 rounded-lg shadow-md border dark:border-surface-800">
                    <div className={`p-0.5 rounded-sm border ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary-600 text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-md">
                    ₹{item.basePrice}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-1 text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-surface-50 dark:border-surface-800">
                    <p className="text-[9px] font-bold text-surface-400 uppercase tracking-tighter mb-0.5">Ingredients</p>
                    <p className="text-xs text-surface-600 dark:text-surface-300 italic line-clamp-1">
                      {item.ingredients}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-40">
              <Search size={48} />
              <p className="mt-4 font-bold text-lg">No items found</p>
              <p className="text-sm mt-1">Try a different search or filter</p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Order Panel (Shifted to the right side) */}
      <div className={`${activeTab === 'cart' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[380px] flex-col gap-4 flex-shrink-0 h-full overflow-hidden`}>
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
              placeholder="Customer Name *"
              value={customer.name}
              onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm outline-none transition-all text-surface-850 dark:text-white"
            />
            <input
              type="text"
              placeholder="Customer Phone No *"
              value={customer.mobile}
              onChange={(e) => setCustomer(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm outline-none transition-all text-surface-850 dark:text-white"
            />
            <textarea
              placeholder="Delivery Address *"
              value={customer.address || ''}
              onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm outline-none transition-all text-surface-850 dark:text-white resize-none"
              rows="2"
            />

            {/* Payment Methods */}
            <div>
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wider mb-2">Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentType(method.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 ${
                      paymentType === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                        : 'border-transparent bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    <method.icon size={20} className={paymentType === method.id ? 'text-primary-600 dark:text-primary-400' : method.color} />
                    <span className={`text-xs font-bold mt-1 ${paymentType === method.id ? 'text-primary-700 dark:text-primary-400' : 'text-surface-600 dark:text-surface-400'}`}>
                      {method.label}
                    </span>
                    <span className={`text-[9px] mt-0.5 ${paymentType === method.id ? 'text-primary-500 dark:text-primary-500' : 'text-surface-400'}`}>
                      {method.sublabel}
                    </span>
                  </button>
                ))}
              </div>
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
                <div key={item.id} className="bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl border border-transparent hover:border-surface-200 dark:hover:border-surface-700 transition-all group flex gap-3">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                        <p className="font-bold text-sm text-surface-800 dark:text-surface-200 truncate">{item.name}</p>
                      </div>
                      <p className="font-bold text-primary-600 dark:text-primary-400 text-sm whitespace-nowrap">₹{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-surface-700 shadow-sm hover:bg-primary-500 hover:text-white transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-surface-700 shadow-sm hover:bg-primary-500 hover:text-white transition-all">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-surface-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
              <span className="text-surface-500">GST (5%)</span>
              <span className="font-bold text-red-400">+ ₹{tax.toFixed(0)}</span>
            </div>
            {deliveryCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-surface-500">Delivery Charge</span>
                <span className="font-bold text-amber-500">+ ₹{deliveryCharge.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Pay via</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">{getPaymentLabel(paymentType)}</span>
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

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md shadow-xl border border-surface-200 dark:border-surface-800 rounded-2xl p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-3 text-center rounded-xl font-bold transition-all text-sm ${
            activeTab === 'menu'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
              : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800'
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex-1 py-3 text-center rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 relative ${
            activeTab === 'cart'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
              : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800'
          }`}
        >
          Cart
          {cart.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default POS;