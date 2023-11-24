import { mockOrderModel } from "../../data/test/mock-order";
import { CreateOrderContract, CreateOrderReturn } from "../../domain/usecases-contracts/create-order";

export const mockCreateOrder = (): CreateOrderContract => {
	class CreateOrderStub implements CreateOrderContract {
		async create (): Promise<CreateOrderReturn> {
			return await Promise.resolve(mockOrderModel());
		}
	}
	return new CreateOrderStub();
};