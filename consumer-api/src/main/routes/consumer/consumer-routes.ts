/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeGetConsumerController } from '../../factories/controllers/get-consumer-controller-factory';
import { makeAddConsumerController } from '../../factories/controllers/add-consumer-controller-factory';

export const consumerRoutes = Router();

consumerRoutes.get('/consumer/:id', adaptRoute(makeGetConsumerController()));
consumerRoutes.post('/consumer', adaptRoute(makeAddConsumerController()));