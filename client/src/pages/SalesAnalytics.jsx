import React, { useState, useEffect } from 'react';
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Analytics</h1>

      {/* Date Range Filter */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <div className="flex space-x-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={fetchSalesData}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">
            ₹{salesData.dailySales.reduce((sum, day) => sum + day.totalSales, 0).toFixed(0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">
            {salesData.dailySales.reduce((sum, day) => sum + day.orderCount, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-600">Average Order Value</h3>
          <p className="text-3xl font-bold text-gray-800">
            ₹{(salesData.dailySales.reduce((sum, day) => sum + day.averageOrderValue, 0) / salesData.dailySales.length || 0).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Daily Sales Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Daily Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-right">Orders</th>
                <th className="px-4 py-2 text-right">Revenue</th>
                <th className="px-4 py-2 text-right">Average Order</th>
              </tr>
            </thead>
            <tbody>
              {salesData.dailySales.map((day, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{day._id.date}</td>
                  <td className="px-4 py-3 text-right">{day.orderCount}</td>
                  <td className="px-4 py-3 text-right">₹{day.totalSales.toFixed(0)}</td>
                  <td className="px-4 py-3 text-right">₹{day.averageOrderValue.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Items Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Top Selling Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-right">Quantity Sold</th>
                <th className="px-4 py-2 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesData.popularItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{item._id}</td>
                  <td className="px-4 py-3 text-right">{item.totalQuantity}</td>
                  <td className="px-4 py-3 text-right">₹{item.totalRevenue.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;