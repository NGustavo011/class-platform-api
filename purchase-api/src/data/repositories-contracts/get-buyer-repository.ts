import { BuyerModel } from '../../domain/models/buyer'

export interface GetBuyerRepository {
  get: (id: string) => Promise<BuyerModel | null>
}
