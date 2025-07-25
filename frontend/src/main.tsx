import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import KeycloakProviderWrapper from './auth/KeycloakProviderWrapper';

createRoot(document.getElementById('root')!).render(
  <KeycloakProviderWrapper>
    <RouterProvider router={router} />
  </KeycloakProviderWrapper>
);
