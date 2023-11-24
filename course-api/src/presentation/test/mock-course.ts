import { mockCourseModel } from "../../data/test/mock-course";
import { AddCourseContract, AddCourseReturn } from "../../domain/usecases-contracts/add-course";
import { GetCourseContract, GetCourseReturn } from "../../domain/usecases-contracts/get-course";

export const mockAddCourse = (): AddCourseContract => {
	class AddCourseStub implements AddCourseContract {
		async add (): Promise<AddCourseReturn | null> {
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new AddCourseStub();
};

export const mockGetCourse = (): GetCourseContract => {
	class GetCourseStub implements GetCourseContract {
		async get (): Promise<GetCourseReturn | null> {
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new GetCourseStub();
};