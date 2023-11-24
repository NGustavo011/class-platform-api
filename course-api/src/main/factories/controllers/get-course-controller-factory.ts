import { Controller } from "../../../presentation/contracts/controller";
import { GetCourseController } from "../../../presentation/controllers/get-course/get-course-controller";
import { makeGetCourse } from "../usecases/get-course-factory";

export const makeGetCourseController = (): Controller => {
	const controller = new GetCourseController(makeGetCourse());
	return controller;
};