import { Router } from 'express';
import { registrationAgreementRoutes } from './registration-agreement/registration-agreement-routes';

export const router = Router();

router.use('/', registrationAgreementRoutes);