import { BuyerModel } from '../../domain/models/buyer';
import { GetBuyerParams, GetBuyerReturn } from '../../domain/usecases-contracts/get-buyer';
import { GetBuyerRepository } from '../repositories-contracts/get-buyer-repository';

export const mockBuyerModel = (): BuyerModel => ({
    id: 'any_buyer_id',
    name: 'any_buyer_name',
    cpf: 'any_buyer_cpf'
});

export const mockGetBuyerParams = (): GetBuyerParams => ('any_buyer_id');

export const mockGetBuyerRepository = (): GetBuyerRepository => {
	class GetBuyerRepositoryStub implements GetBuyerRepository {
		async get(): Promise<GetBuyerReturn>{
			return await Promise.resolve(mockBuyerModel());
		}
	}
	return new GetBuyerRepositoryStub();
};