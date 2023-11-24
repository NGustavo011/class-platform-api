import { GetCourse } from "../../../data/usecases/get-course/get-course";
import { AxiosAdapter } from "../../../infra/http-client/adapters/axios-adapter";
import { CourseHttpClient } from "../../../infra/http-client/axios/course/course-http-client";

export const makeGetCourse = (): GetCourse => {
	const courseHttpClient = new CourseHttpClient(new AxiosAdapter());
	return new GetCourse(courseHttpClient);
};