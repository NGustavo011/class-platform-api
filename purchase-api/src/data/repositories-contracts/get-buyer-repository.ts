import { BuyerModel } from '../../domain/models/buyer'
import { GetBuyerParams, GetBuyerReturn } from '../../domain/usecases-contracts/get-buyer'

export interface GetBuyerRepository {
  get: (id: GetBuyerParams) => Promise<GetBuyerReturn | null>
}
