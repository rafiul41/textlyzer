import { Router } from 'express';
import { saveTextController } from '../controllers/text.controller';
import Keycloak from 'keycloak-connect';

const router = Router();

// Keycloak instance will be passed from app
export default (keycloak: Keycloak.Keycloak) => {
  router.post('/text', keycloak.protect(), saveTextController);
  return router;
}; 