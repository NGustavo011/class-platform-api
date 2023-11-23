import { mockConsumerModel } from "../../data/test/mock-consumer";
import { AddConsumerContract, AddConsumerReturn } from "../../domain/usecases-contracts/add-consumer";
import { GetConsumerContract, GetConsumerReturn } from "../../domain/usecases-contracts/get-consumer";

export const mockAddConsumer = (): AddConsumerContract => {
	class AddConsumerStub implements AddConsumerContract {
		async add (): Promise<AddConsumerReturn | null> {
			return await Promise.resolve(mockConsumerModel());
		}
	}
	return new AddConsumerStub();
};

export const mockGetConsumer = (): GetConsumerContract => {
	class GetConsumerStub implements GetConsumerContract {
		async get (): Promise<GetConsumerReturn | null> {
			return await Promise.resolve(mockConsumerModel());
		}
	}
	return new GetConsumerStub();
};