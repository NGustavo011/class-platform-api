import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { badRequest, ok } from '../../helpers/http/http-helper';
import { z } from 'zod';
import { GetCourseContract } from '../../../domain/usecases-contracts/get-course';
import { InvalidParamError } from '../../errors/invalid-param-error';

const getCourseParams = z.object({
	id: z.string()
});

export class GetCourseController extends Controller {
	constructor(
        private readonly getCourse: GetCourseContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const paramsResult = getCourseParams.parse(httpRequest.params);
		const { 
			id
		} = paramsResult;
		const getCourseData = await this.getCourse.get({
			id
		});
        if(!getCourseData) {
            return badRequest(new InvalidParamError("id"));
        }
		return ok(getCourseData);
	}
}