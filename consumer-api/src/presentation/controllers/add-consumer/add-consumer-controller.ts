import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { ok } from '../../helpers/http/http-helper';
import { z } from 'zod';
import { AddConsumerContract } from '../../../domain/usecases-contracts/add-consumer';

const addConsumerSchema = z.object({
	name: z.string(),
	cpf: z.string()
});

export class AddConsumerController extends Controller {
	constructor(
        private readonly addConsumer: AddConsumerContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const schemaResult = addConsumerSchema.parse(httpRequest.body);
		const { 
			name,
			cpf
		} = schemaResult;
		const addConsumerData = await this.addConsumer.add({
			name,
			cpf
		});
		return ok(addConsumerData);
	}
}