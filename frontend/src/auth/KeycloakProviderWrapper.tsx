import { ReactKeycloakProvider } from "@react-keycloak/web";
import {getKeycloakInstance} from "./keycloak";
import type { ReactNode } from 'react';

const KeycloakProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReactKeycloakProvider
      authClient={getKeycloakInstance()}
      initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProviderWrapper;