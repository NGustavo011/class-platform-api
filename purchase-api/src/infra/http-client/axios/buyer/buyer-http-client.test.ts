import { AxiosAdapter } from '../../adapters/axios-adapter'
import { BuyerHttpClient } from './buyer-http-client'

const makeSut = (): BuyerHttpClient => {
  return new BuyerHttpClient(new AxiosAdapter())
}

describe('BuyerHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um buyer corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const buyer = await sut.get('e1ec5061-4954-43b3-8d05-61094b62920c')
      expect(buyer).toBeTruthy()
      expect(buyer?.id).toBe('e1ec5061-4954-43b3-8d05-61094b62920c')
      expect(buyer?.name).toBeTruthy()
      expect(buyer?.cpf).toBeTruthy()
    })
    test('Deve retornar null em caso de não encontrar o buyer especificado', async () => {
      const sut = makeSut()
      const buyer = await sut.get('1')
      expect(buyer).toBeNull()
    })
  })
})
