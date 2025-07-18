import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard.tsx';
import TextList from './components/TextList.tsx';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    element: <App />, // App will wrap the protected routes, thus every route is protected
    path: '/',
    children: [
      {
        path: '/',
        element: <TextList />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

export default router;
