import { CourseModel } from '../../domain/models/course';
import { GetCourseParams, GetCourseReturn } from '../../domain/usecases-contracts/get-course';
import { GetCourseRepository } from '../repositories-contracts/get-course-repository';

export const mockCourseModel = (): CourseModel => ({
    id: 'any_course_id',
    name: 'any_course_name',
    description: 'any_description'
});

export const mockGetCourseParams = (): GetCourseParams => ('any_course_id');

export const mockGetCourseRepository = (): GetCourseRepository => {
	class GetCourseRepositoryStub implements GetCourseRepository {
		async get(): Promise<GetCourseReturn>{
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new GetCourseRepositoryStub();
};