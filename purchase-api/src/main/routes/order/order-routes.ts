/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeCreateOrderController } from '../../factories/controllers/create-order-controller-factory';

export const orderRoutes = Router();

orderRoutes.post('/order', adaptRoute(makeCreateOrderController()));