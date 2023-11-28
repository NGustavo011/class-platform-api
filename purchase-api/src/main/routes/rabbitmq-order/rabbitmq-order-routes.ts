/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeCreateOrderControllerRabbitmq } from '../../factories/controllers/create-order-controller-rabbitmq-factory';

export const rabbitmqOrderRoutes = Router();

rabbitmqOrderRoutes.post('/queue/order', adaptRoute(makeCreateOrderControllerRabbitmq()));