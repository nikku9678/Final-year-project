import React from 'react';
import  Header from './components/navbar/Header.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PublicRoute from './context/PublicRoute';
import ProtectedRoute from './context/ProtectRoute.jsx';
import Dashboard from './pages/user/Dashboard';
import Home from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import UserProfile from './pages/user/UserProfile';

const App = () => {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Redirects to home if no specific path is provided */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Dashboard />} />} />
        {/* <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} /> */}
        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Catch all undefined routes */}




      </Routes>
    </Router>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </>
  );
}

export default App;
