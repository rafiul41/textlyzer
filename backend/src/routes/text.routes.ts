import { Router } from 'express';
import {
  saveTextController,
  listTextsController,
  getTextController,
  updateTextController,
  deleteTextController
} from '../controllers/text.controller';
import Keycloak from 'keycloak-connect';

const router = Router();

export default (keycloak: Keycloak.Keycloak) => {
  router.post('/text', keycloak.protect(), saveTextController);
  router.get('/text/:id', keycloak.protect(), getTextController);
  router.get('/text', keycloak.protect(), listTextsController);
  router.put('/text/:id', keycloak.protect(), updateTextController);
  router.delete('/text/:id', keycloak.protect(), deleteTextController);
  return router;
}; 