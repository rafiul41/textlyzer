import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized || !keycloak.authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <button className="nav-toggle" onClick={() => setNavOpen(true)}>
        <span>&#9776;</span>
      </button>
      {navOpen && (
        <div className="nav-overlay" onClick={() => setNavOpen(false)}></div>
      )}
      <nav className={`app-nav${navOpen ? ' nav-open' : ''}`}>
        {navOpen && (
          <button className="nav-close" onClick={() => setNavOpen(false)}>
            <span>&#10005;</span>
          </button>
        )}
        <Link to="/" className="nav-logo" onClick={() => setNavOpen(false)}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className="nav-logo"
          onClick={() => setNavOpen(false)}
        >
          Dashboard
        </Link>
      </nav>
      <main className="app-main">
        <button
          className="logout-btn"
          onClick={() =>
            keycloak.logout({ redirectUri: window.location.origin })
          }
        >
          Logout
        </button>
        <div className='outlet-container'>
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
