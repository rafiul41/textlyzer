import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const App = () => {
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
    <div className='app-container'>
      App container (protected layout)
      <Outlet />
    </div>
  );
};

export default App;
