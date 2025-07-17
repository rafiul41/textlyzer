import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login.tsx';
import ProtectedLayout from './components/ProtectedLayout';
import Dashboard from './components/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <ProtectedLayout />, // Wrap protected routes
    path: '/',
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

export default router;
