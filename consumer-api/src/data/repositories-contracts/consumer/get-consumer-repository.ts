import { GetConsumerParams, GetConsumerReturn } from '../../../domain/usecases-contracts/consumer/get-consumer';

export interface GetConsumerRepository {
  get: (getConsumerParams: GetConsumerParams) => Promise<GetConsumerReturn | null>
}
