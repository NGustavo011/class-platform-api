/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeGetCourseController } from '../../factories/controllers/get-course-controller-factory';
import { makeAddCourseController } from '../../factories/controllers/add-course-controller-factory';

export const courseRoutes = Router();

courseRoutes.get('/course/:id', adaptRoute(makeGetCourseController()));
courseRoutes.post('/course', adaptRoute(makeAddCourseController()));