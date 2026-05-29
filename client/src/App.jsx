import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import POS from './pages/POS';
import MenuManagement from './pages/MenuManagement';
import SalesAnalytics from './pages/SalesAnalytics';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><POS /></Layout>} />
        <Route path="/menu" element={<MenuManagement />} />
        <Route path="/sales" element={<SalesAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;