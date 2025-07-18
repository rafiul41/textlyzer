import { Router } from 'express';
import { getTextAnalysisController } from '../controllers/textAnalysis.controller';
import Keycloak from 'keycloak-connect';

const router = Router();

export default (keycloak: Keycloak.Keycloak) => {
  router.get('/text-analysis/:textId', keycloak.protect(), getTextAnalysisController);
  return router;
}; 