// src/auth/ProtectedLayout.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedLayout = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized || !keycloak.authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Protected Layout
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
