import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Simulate } from './pages/Simulate';
import { Login } from './pages/Login';
import { api } from './services/api';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
  };

  if (loading) return null;

  return (
    <Router>
      <Layout 
        userProgress={user?.progress} 
        userAvatar={user?.avatarUrl}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/app/dashboard" />} />
          <Route path="/login" element={<Login onLoginSuccess={() => api.getCurrentUser().then(setUser)} />} />
          
          {/* Protected Routes */}
          <Route path="/app/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/app/learn" element={user ? <Learn /> : <Navigate to="/login" />} />
          <Route path="/app/simulate" element={user ? <Simulate /> : <Navigate to="/login" />} />
          <Route path="/app/simulate/active" element={user ? <Simulate /> : <Navigate to="/login" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;