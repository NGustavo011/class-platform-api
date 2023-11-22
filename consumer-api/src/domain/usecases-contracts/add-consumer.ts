import { ConsumerModel } from '../models/consumer';

export type AddConsumerParams = Omit<ConsumerModel, 'id'>
export type AddConsumerReturn = ConsumerModel

export interface AddConsumerContract {
    add: (addConsumerParams: AddConsumerParams) => Promise<AddConsumerReturn | null>
}