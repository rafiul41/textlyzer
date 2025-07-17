import { createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout';
import Dashboard from './components/Dashboard.tsx';

const router = createBrowserRouter([
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
