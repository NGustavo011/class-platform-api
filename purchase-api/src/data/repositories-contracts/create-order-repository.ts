import { CreateOrderParams, CreateOrderReturn } from '../../domain/usecases-contracts/create-order';

export type CreateOrderRepositoryReturn = Omit<CreateOrderReturn, 'buyer' | 'course'>

export interface CreateOrderRepository {
  create: (createOrderParams: CreateOrderParams) => Promise<CreateOrderRepositoryReturn>
}
