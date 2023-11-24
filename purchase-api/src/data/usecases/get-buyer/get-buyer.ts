import { GetBuyerContract, GetBuyerParams, GetBuyerReturn } from '../../../domain/usecases-contracts/get-buyer';
import { GetBuyerRepository } from '../../repositories-contracts/get-buyer-repository';


export class GetBuyer implements GetBuyerContract {
	constructor(
			private readonly getBuyerRepository: GetBuyerRepository
		){
	}

	async get (getBuyerParams: GetBuyerParams): Promise<GetBuyerReturn | null>{
		const id = getBuyerParams;
		const buyer = await this.getBuyerRepository.get(id);
		return buyer
	}
}