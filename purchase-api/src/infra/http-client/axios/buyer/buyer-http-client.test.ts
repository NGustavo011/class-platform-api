import { AxiosAdapter } from '../../adapters/axios-adapter'
import { BuyerHttpClient } from './buyer-http-client'

const makeSut = (): BuyerHttpClient => {
  return new BuyerHttpClient(new AxiosAdapter())
}

describe('BuyerHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um buyer corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const buyer = await sut.get('ca4a9e68-766f-43e2-a53a-489748fe07d5')
      expect(buyer).toBeTruthy()
      expect(buyer?.id).toBe('ca4a9e68-766f-43e2-a53a-489748fe07d5')
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
