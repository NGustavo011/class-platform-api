import { BuyerModel } from '../models/buyer';

export type GetBuyerParams = string
export type GetBuyerReturn = BuyerModel

export interface GetBuyerContract {
    get: (getBuyerParams: GetBuyerParams) => Promise<GetBuyerReturn | null>
}