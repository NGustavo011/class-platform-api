import { ConsumerModel } from '../../models/consumer';

export interface GetConsumerParams {
  id: string
}
export type GetConsumerReturn = ConsumerModel

export interface GetConsumerContract {
  get: (getConsumerParams: GetConsumerParams) => Promise<GetConsumerReturn | null>
}
