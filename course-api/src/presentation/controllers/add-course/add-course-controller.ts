import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { ok } from '../../helpers/http/http-helper';
import { z } from 'zod';
import { AddCourseContract } from '../../../domain/usecases-contracts/add-course';

const addCourseSchema = z.object({
	name: z.string(),
	description: z.string()
});

export class AddCourseController extends Controller {
	constructor(
        private readonly addCourse: AddCourseContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const schemaResult = addCourseSchema.parse(httpRequest.body);
		const { 
			name,
			description
		} = schemaResult;
		const addCourseData = await this.addCourse.add({
			name,
			description
		});
		return ok(addCourseData);
	}
}