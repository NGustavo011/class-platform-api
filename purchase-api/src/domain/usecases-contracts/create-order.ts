import { OrderModel } from '../models/order';

export type CreateOrderParams = Omit<OrderModel, 'id'>
export type CreateOrderReturn = OrderModel

export interface CreateOrderContract {
    create: (createOrderParams: CreateOrderParams) => Promise<CreateOrderReturn>
}