import { AddConsumerParams, AddConsumerReturn } from '../../domain/usecases-contracts/add-consumer';

export interface AddConsumerRepository {
  add: (addConsumerParams: AddConsumerParams) => Promise<AddConsumerReturn | null>
}
