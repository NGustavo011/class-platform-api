import { CreateOrderParams, CreateOrderReturn } from '../../domain/usecases-contracts/create-order';

export interface CreateOrderRepository {
  create: (createOrderParams: CreateOrderParams) => Promise<CreateOrderReturn | null>
}
