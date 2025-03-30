import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Assume implemented
import DashboardPage from './pages/DashboardPage'; // Assume implemented
import ChannelsPage from './pages/ChannelsPage'; // Assume implemented
import ChannelDetailPage from './pages/ChannelDetailPage'; // Assume implemented
import QuestionDetailPage from './pages/QuestionDetailPage'; // Assume implemented
import ProfilePage from './pages/ProfilePage'; // Assume implemented
// import AdminPage from './pages/AdminPage'; // Assume implemented

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/channels" element={<ProtectedRoute><ChannelsPage /></ProtectedRoute>} />
          <Route path="/channels/:channelId" element={<ProtectedRoute><ChannelDetailPage /></ProtectedRoute>} />
          <Route path="/questions/:questionId" element={<ProtectedRoute><QuestionDetailPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          {/* <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
