import { GetCourseContract, GetCourseParams, GetCourseReturn } from '../../../domain/usecases-contracts/get-course';
import { GetCourseRepository } from '../../repositories-contracts/get-course-repository';

export class GetCourse implements GetCourseContract {
	constructor(private readonly getCourseRepository: GetCourseRepository){
	}

	async get (getCourseParams: GetCourseParams): Promise<GetCourseReturn | null>{
		const getCourse = await this.getCourseRepository.get(getCourseParams);
		return getCourse;
	}
}