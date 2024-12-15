import React from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PublicRoute from './context/PublicRoute';
import ProtectedRoute from './context/ProtectRoute.jsx';
import Dashboard from './pages/user/Dashboard';
import Home from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Redirects to home if no specific path is provided */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Catch all undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
