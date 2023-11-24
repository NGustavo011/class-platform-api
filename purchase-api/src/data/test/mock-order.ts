import { OrderModel } from '../../domain/models/order';
import { CreateOrderParams, CreateOrderReturn } from '../../domain/usecases-contracts/create-order';
import { CreateOrderRepository } from '../repositories-contracts/create-order-repository';

export const mockOrderModel = (): OrderModel => ({
	id: 'any_id',
	buyerId: 'any_buyer_id',
	buyer: {
		id: 'any_buyer_id',
		name: 'any_buyer_name',
    	cpf: 'any_buyer_cpf'
	},
	courseId: 'any_course_id',
	course: {
		id: 'any_course_id',
		name: 'any_course_name',
    	description: 'any_course_description'
	}
});

export const mockCreateOrderParams = (): CreateOrderParams => ({
	buyerId: 'any_buyer_id',
	courseId: 'any_course_id',
});

export const mockCreateOrderRepository = (): CreateOrderRepository => {
	class CreateOrderRepositoryStub implements CreateOrderRepository {
		async create(): Promise<CreateOrderReturn | null>{
			return await Promise.resolve(mockOrderModel());
		}
	}
	return new CreateOrderRepositoryStub();
};