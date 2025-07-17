// src/auth/keycloak.ts
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080", // Your Keycloak URL
  realm: "textlyzer",
  clientId: "textlyzer-frontend",
});

export default keycloak;