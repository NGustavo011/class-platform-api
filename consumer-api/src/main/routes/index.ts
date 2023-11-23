import { Router } from 'express';
import { consumerRoutes } from './consumer/consumer-routes';

export const router = Router();

router.use('/', consumerRoutes);