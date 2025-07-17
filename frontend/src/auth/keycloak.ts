import Keycloak from "keycloak-js";

let keycloakInstance: Keycloak | null = null;

export function getKeycloakInstance() {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: "http://localhost:8080", // Your Keycloak URL
      realm: "textlyzer",
      clientId: "textlyzer-frontend",
    });
  }
  return keycloakInstance;
}
