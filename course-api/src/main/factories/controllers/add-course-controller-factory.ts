import { Controller } from "../../../presentation/contracts/controller";
import { AddCourseController } from "../../../presentation/controllers/add-course/add-course-controller";
import { makeAddCourse } from "../usecases/add-course-factory";

export const makeAddCourseController = (): Controller => {
	const controller = new AddCourseController(makeAddCourse());
	return controller;
};