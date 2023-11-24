import { type GetBuyerRepository } from '../../../../data/repositories-contracts/get-buyer-repository'
import { GetBuyerParams, GetBuyerReturn } from '../../../../domain/usecases-contracts/get-buyer'
import env from '../../../../main/config/env'
import { type HttpClient } from '../../contract/http-client'

export class BuyerHttpClient implements GetBuyerRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async get (id: GetBuyerParams): Promise<GetBuyerReturn | null> {
    try {
      const response = await this.httpClient.get(`${env.buyerApiUrl}consumer/${id}`)
      return {
        id: response.id,
        name: response.name,
        cpf: response.cpf
      }
    } catch (error) {
      return null
    }
  }
}
