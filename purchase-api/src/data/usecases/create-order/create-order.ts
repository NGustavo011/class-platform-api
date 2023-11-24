import { CreateOrderContract, CreateOrderParams, CreateOrderReturn } from '../../../domain/usecases-contracts/create-order';
import { CreateOrderRepository } from '../../repositories-contracts/create-order-repository';

export class CreateOrder implements CreateOrderContract {
	constructor(
			private readonly createOrderRepository: CreateOrderRepository
		){
	}

	async create (createOrderParams: CreateOrderParams): Promise<CreateOrderReturn>{
		const { buyer, buyerId, course, courseId } = createOrderParams;
		const order = await this.createOrderRepository.create(createOrderParams);
		const { id } = order;
		return {
			buyer,
			buyerId,
			course,
			courseId,
			id	
		};
	}
}