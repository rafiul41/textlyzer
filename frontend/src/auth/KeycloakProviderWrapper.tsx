import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import type { ReactNode } from 'react';

const KeycloakProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProviderWrapper;