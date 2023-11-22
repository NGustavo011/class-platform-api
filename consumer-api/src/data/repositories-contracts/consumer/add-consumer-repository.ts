import { AddConsumerParams, AddConsumerReturn } from '../../../domain/usecases-contracts/consumer/add-consumer';

export interface AddConsumerRepository {
  add: (addConsumerParams: AddConsumerParams) => Promise<AddConsumerReturn | null>
}
