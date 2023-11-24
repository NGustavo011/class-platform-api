import { AddCourseContract, AddCourseParams, AddCourseReturn } from '../../../domain/usecases-contracts/add-course';
import { AddCourseRepository } from '../../repositories-contracts/add-course-repository';


export class AddCourse implements AddCourseContract {
	constructor(private readonly addCourseRepository: AddCourseRepository){
	}

	async add (addCourseParams: AddCourseParams): Promise<AddCourseReturn | null>{
		const course = await this.addCourseRepository.add(addCourseParams);
		return course;
	}
}