import { AddCourse } from "../../../data/usecases/add-course/add-course";
import { CoursePrismaRepository } from "../../../infra/db/prisma/course-prisma-repository";

export const makeAddCourse = (): AddCourse => {
	const addCourseRepository = new CoursePrismaRepository();
	return new AddCourse(addCourseRepository);
};