import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { badRequest, ok } from '../../helpers/http/http-helper';
import { z } from 'zod';
import { CreateOrderContract } from '../../../domain/usecases-contracts/create-order';
import { GetBuyerContract } from '../../../domain/usecases-contracts/get-buyer';
import { GetCourseContract } from '../../../domain/usecases-contracts/get-course';
import { InvalidParamError } from '../../errors/invalid-param-error';

const createOrderSchema = z.object({
	buyerId: z.string(),
	courseId: z.string()
});

export class CreateOrderController extends Controller {
	constructor(
		private readonly getBuyer: GetBuyerContract,
		private readonly getCourse: GetCourseContract,
        private readonly createOrder: CreateOrderContract
	){
		super();
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const schemaResult = createOrderSchema.parse(httpRequest.body);
		const { 
			buyerId,
			courseId
		} = schemaResult;
		const buyer = await this.getBuyer.get(buyerId);
		if(!buyer)
			return badRequest(new InvalidParamError("buyerId"))
		const course = await this.getCourse.get(courseId);
		if(!course)
			return badRequest(new InvalidParamError("courseId"))
		const createOrderData = await this.createOrder.create({
			buyerId,
			buyer,
			courseId,
			course
		});
		return ok(createOrderData);
	}
}