import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { badRequest, ok } from '../../helpers/http/http-helper';
import { z } from 'zod';
import { GetConsumerContract } from '../../../domain/usecases-contracts/get-consumer';
import { InvalidParamError } from '../../errors/invalid-param-error';

const getConsumerParams = z.object({
	id: z.string()
});

export class GetConsumerController extends Controller {
	constructor(
        private readonly getConsumer: GetConsumerContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const paramsResult = getConsumerParams.parse(httpRequest.params);
		const { 
			id
		} = paramsResult;
		const getConsumerData = await this.getConsumer.get({
			id
		});
        if(!getConsumerData) {
            return badRequest(new InvalidParamError("id"));
        }
		return ok(getConsumerData);
	}
}