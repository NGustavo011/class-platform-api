import { Router } from 'express';
import { orderRoutes } from './order/order-routes';
import { rabbitmqOrderRoutes } from './rabbitmq-order/rabbitmq-order-routes';

export const router = Router();

router.use('/', orderRoutes, rabbitmqOrderRoutes);