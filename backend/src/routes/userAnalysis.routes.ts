import { Router } from 'express';
import { getUserAnalysisController } from '../controllers/userAnalysis.controller';
import Keycloak from 'keycloak-connect';

const router = Router();

export default (keycloak: Keycloak.Keycloak) => {
  router.get('/user-analysis', keycloak.protect(), getUserAnalysisController);
  return router;
}; 