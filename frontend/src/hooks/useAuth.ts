import { useEffect, useState, useCallback, useRef } from 'react';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/',
  realm: 'textlyzer',
  clientId: 'textlyzer-frontend',
};

const keycloak = new Keycloak(keycloakConfig);

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if(hasRun.current) return;
    hasRun.current = true;
    if (!initialized) {
      keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
        .then(authenticated => {
          setIsAuthenticated(authenticated);
          setInitialized(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setInitialized(true);
        });
    }
  }, [initialized]);

  const login = useCallback(() => {
    keycloak.login();
  }, []);

  const logout = useCallback(() => {
    keycloak.logout();
  }, []);

  return { isAuthenticated, login, logout, keycloak };
} 