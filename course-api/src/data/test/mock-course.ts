import { CourseModel } from '../../domain/models/course';
import { AddCourseParams, AddCourseReturn } from '../../domain/usecases-contracts/add-course';
import { GetCourseParams, GetCourseReturn } from '../../domain/usecases-contracts/get-course';
import { AddCourseRepository } from '../repositories-contracts/add-course-repository';
import { GetCourseRepository } from '../repositories-contracts/get-course-repository';

export const mockCourseModel = (): CourseModel => ({
	id: 'any_id',
	name: 'any_name',
    description: 'any_description'
});

export const mockGetCourseParams = (): GetCourseParams => ({
	id: 'any_id'
});

export const mockAddCourseParams = (): AddCourseParams => ({
	name: 'any_name',
	description: 'any_description'
});

export const mockGetCourseRepository = (): GetCourseRepository => {
	class GetCourseRepositoryStub implements GetCourseRepository {
		async get(): Promise<GetCourseReturn | null>{
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new GetCourseRepositoryStub();
};

export const mockAddCourseRepository = (): AddCourseRepository => {
	class AddCourseRepositoryStub implements AddCourseRepository {
		async add(): Promise<AddCourseReturn | null>{
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new AddCourseRepositoryStub();
};