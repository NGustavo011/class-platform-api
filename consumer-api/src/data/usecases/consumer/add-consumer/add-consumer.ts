import { AddConsumerContract, AddConsumerParams, AddConsumerReturn } from '../../../../domain/usecases-contracts/consumer/add-consumer';
import { AddConsumerRepository } from '../../../repositories-contracts/consumer/add-consumer-repository';


export class AddConsumer implements AddConsumerContract {
	constructor(private readonly addConsumerRepository: AddConsumerRepository){
	}

	async add (addConsumerParams: AddConsumerParams): Promise<AddConsumerReturn | null>{
		const consumer = await this.addConsumerRepository.add(addConsumerParams);
		return consumer;
	}
}