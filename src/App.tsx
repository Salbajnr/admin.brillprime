

import { Router } from 'wouter';
import { AdminRoutes } from './components/AdminRoutes';
import { Toaster } from './components/ui/toaster';
import { AuthProvider, useAuth } from './auth';
import Login from './Login';


function AppContent() {
  const { isAuthenticated } = useAuth();
  return (
    <Router base="/admin">
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? <AdminRoutes /> : <Login />}
        <Toaster />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
