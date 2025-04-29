import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Button from './pages/Button'; // Bottom navigation component
import Search from './pages/pages/Search';
import Saved from './pages/pages/Liked.jsx';
import Cart from './pages/pages/Cart';
import Account from './pages/pages/Account';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

// Layout for authenticated routes with bottom navigation
const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <div className="flex-grow overflow-y-auto pb-16">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Button />
      </div>
    </>
  );
};

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/auth" element={
            currentUser ? <Navigate to="/dashboard" /> : <AuthPage />
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/search" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Search />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/saved" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Saved />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Cart />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="/account" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Account />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
};

// ✅ Faqat bitta `App` komponentini eksport qilamiz
const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
