import { GetConsumerContract, GetConsumerParams, GetConsumerReturn } from '../../../../domain/usecases-contracts/consumer/get-consumer';
import { GetConsumerRepository } from '../../../repositories-contracts/consumer/get-consumer-repository';

export class GetConsumer implements GetConsumerContract {
	constructor(private readonly getConsumerRepository: GetConsumerRepository){
	}

	async get (getConsumerParams: GetConsumerParams): Promise<GetConsumerReturn | null>{
		const getConsumer = await this.getConsumerRepository.get(getConsumerParams);
		return getConsumer;
	}
}