import { Router } from 'express';
import { orderRoutes } from './order/order-routes';

export const router = Router();

router.use('/', orderRoutes);