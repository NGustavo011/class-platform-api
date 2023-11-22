import { ConsumerModel } from '../../domain/models/consumer';
import { AddConsumerParams, AddConsumerReturn } from '../../domain/usecases-contracts/consumer/add-consumer';
import { GetConsumerParams, GetConsumerReturn } from '../../domain/usecases-contracts/consumer/get-consumer';
import { AddConsumerRepository } from '../repositories-contracts/consumer/add-consumer-repository';
import { GetConsumerRepository } from '../repositories-contracts/consumer/get-consumer-repository';

export const mockConsumerModel = (): ConsumerModel => ({
	id: 'any_id',
	name: 'any_name',
    cpf: 'any_cpf'
});

export const mockGetConsumerParams = (): GetConsumerParams => ({
	id: 'any_id'
});

export const mockAddConsumerParams = (): AddConsumerParams => ({
	name: 'any_name',
	cpf: 'any_cpf'
});

export const mockGetConsumerRepository = (): GetConsumerRepository => {
	class GetConsumerRepositoryStub implements GetConsumerRepository {
		async get(): Promise<GetConsumerReturn | null>{
			return await Promise.resolve(mockConsumerModel());
		}
	}
	return new GetConsumerRepositoryStub();
};

export const mockAddConsumerRepository = (): AddConsumerRepository => {
	class AddConsumerRepositoryStub implements AddConsumerRepository {
		async add(): Promise<AddConsumerReturn | null>{
			return await Promise.resolve(mockConsumerModel());
		}
	}
	return new AddConsumerRepositoryStub();
};