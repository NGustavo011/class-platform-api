/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeGetRegistrationAgreementController } from "../../factories/controllers/get-registration-agreement-factory"

export const registrationAgreementRoutes = Router();

registrationAgreementRoutes.get('/registration-agreement/:id?', adaptRoute(makeGetRegistrationAgreementController()));