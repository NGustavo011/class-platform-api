import { mockCourseModel } from "../../data/test/mock-course";
import { GetCourseContract, GetCourseReturn } from "../../domain/usecases-contracts/get-course";

export const mockGetCourse = (): GetCourseContract => {
	class GetCourseStub implements GetCourseContract {
		async get (): Promise<GetCourseReturn> {
			return await Promise.resolve(mockCourseModel());
		}
	}
	return new GetCourseStub();
};