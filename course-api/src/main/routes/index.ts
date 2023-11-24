import { Router } from 'express';
import { courseRoutes } from './course/course-routes';

export const router = Router();

router.use('/', courseRoutes);