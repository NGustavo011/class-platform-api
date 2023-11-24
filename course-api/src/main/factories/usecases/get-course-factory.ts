import { GetCourse } from "../../../data/usecases/get-course/get-course";
import { CoursePrismaRepository } from "../../../infra/db/prisma/course-prisma-repository";

export const makeGetCourse = (): GetCourse => {
	const getCourseRepository = new CoursePrismaRepository();
	return new GetCourse(getCourseRepository);
};