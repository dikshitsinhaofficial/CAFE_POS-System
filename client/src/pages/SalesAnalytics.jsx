import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, BarChart3, TrendingUp, ShoppingBag, Receipt } from 'lucide-react';
import axios from 'axios';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState({ dailySales: [], popularItems: [] });
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/sales', {
        params: dateRange
      });
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const totalRevenue = salesData.dailySales.reduce((sum, day) => sum + day.totalSales, 0);
  const totalOrders = salesData.dailySales.reduce((sum, day) => sum + day.orderCount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 text-surface-900 dark:text-surface-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-1">Sales Analytics</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Monitor your cafe's daily sales performance and top selling items</p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-3 bg-surface-100 hover:bg-surface-200 dark:bg-surface-900 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl transition-all font-semibold border border-surface-200 dark:border-surface-800 text-sm shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to POS
        </Link>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white dark:bg-surface-900 p-5 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 mb-8">
        <h2 className="text-sm font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar size={16} />
          Filter by Date Range
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-surface-500 mb-1.5 uppercase">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm dark:text-white"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-surface-500 mb-1.5 uppercase">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm dark:text-white"
            />
          </div>
          <button
            onClick={fetchSalesData}
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-primary-600/20 text-sm whitespace-nowrap"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex items-center gap-4">
          <div className="p-3 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-surface-400 uppercase tracking-wider">Total Revenue</h3>
            <p className="text-2xl font-black text-surface-900 dark:text-white mt-0.5">
              ₹{totalRevenue.toFixed(0)}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex items-center gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-surface-400 uppercase tracking-wider">Total Orders</h3>
            <p className="text-2xl font-black text-surface-900 dark:text-white mt-0.5">
              {totalOrders}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800 flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Receipt size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-surface-400 uppercase tracking-wider">Average Order Value</h3>
            <p className="text-2xl font-black text-surface-900 dark:text-white mt-0.5">
              ₹{averageOrderValue.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Sales Table */}
        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary-500" />
            Daily Sales Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-100 dark:border-surface-800 text-surface-400 font-semibold text-left">
                  <th className="pb-3 text-left">Date</th>
                  <th className="pb-3 text-right">Orders</th>
                  <th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Average Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {salesData.dailySales.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-surface-400">No data available for this range</td>
                  </tr>
                ) : (
                  salesData.dailySales.map((day, index) => (
                    <tr key={index} className="text-surface-700 dark:text-surface-300">
                      <td className="py-3.5 font-medium">{day._id.date}</td>
                      <td className="py-3.5 text-right">{day.orderCount}</td>
                      <td className="py-3.5 text-right font-semibold">₹{day.totalSales.toFixed(0)}</td>
                      <td className="py-3.5 text-right">₹{day.averageOrderValue.toFixed(0)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Items Table */}
        <div className="bg-white dark:bg-surface-900 p-6 rounded-2xl shadow-sm border border-surface-100 dark:border-surface-800">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary-500" />
            Top Selling Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-100 dark:border-surface-800 text-surface-400 font-semibold text-left">
                  <th className="pb-3 text-left">Item Name</th>
                  <th className="pb-3 text-right">Quantity Sold</th>
                  <th className="pb-3 text-right">Total Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {salesData.popularItems.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-surface-400">No data available for this range</td>
                  </tr>
                ) : (
                  salesData.popularItems.map((item, index) => (
                    <tr key={index} className="text-surface-700 dark:text-surface-300">
                      <td className="py-3.5 font-medium">{item._id}</td>
                      <td className="py-3.5 text-right font-semibold text-primary-600 dark:text-primary-400">{item.totalQuantity}</td>
                      <td className="py-3.5 text-right font-bold">₹{item.totalRevenue.toFixed(0)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;