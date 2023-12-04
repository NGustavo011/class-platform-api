import { AxiosAdapter } from '../../adapters/axios-adapter'
import { BuyerHttpClient } from './buyer-http-client'

const makeSut = (): BuyerHttpClient => {
  return new BuyerHttpClient(new AxiosAdapter())
}

describe('BuyerHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um buyer corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const buyer = await sut.get('84e87f8c-d375-43a1-b077-0fbe8369fa7c')
      expect(buyer).toBeTruthy()
      expect(buyer?.id).toBe('84e87f8c-d375-43a1-b077-0fbe8369fa7c')
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
