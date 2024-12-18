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
import { AllUser } from './pages/admin/AllUser.jsx';
import { AllQuiz } from './pages/admin/AllQuiz.jsx';
import Material from './components/question/Question.jsx';
import StudyMaterial from './pages/study-material/StudyMaterial.jsx';
import Quant from './pages/study-material/Quant.jsx';
import TopicQuestion from './pages/study-material/TopicQuestion.jsx';

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
        <Route path="/admin/all-user" element={<ProtectedRoute element={<AllUser />} />} />
        <Route path="/admin/all-quiz" element={<ProtectedRoute element={<AllQuiz />} />} />

        <Route path="/material" element={<Material />} />
        <Route path="/study-material" element={<StudyMaterial />} />
        <Route path="/study-material/quant" element={<Quant />} />
        <Route path="/study-material/quant/:topic" element={<TopicQuestion />} />



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
