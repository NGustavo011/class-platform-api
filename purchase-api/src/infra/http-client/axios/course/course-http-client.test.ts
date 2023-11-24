import { AxiosAdapter } from '../../adapters/axios-adapter'
import { CourseHttpClient } from './course-http-client'

const makeSut = (): CourseHttpClient => {
  return new CourseHttpClient(new AxiosAdapter())
}

describe('CourseHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um course corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const course = await sut.get('2e865aef-c4a4-4cba-9f3a-3c257f331028')
      expect(course).toBeTruthy()
      expect(course?.id).toBe('2e865aef-c4a4-4cba-9f3a-3c257f331028')
      expect(course?.name).toBeTruthy()
      expect(course?.description).toBeTruthy()
    })
    test('Deve retornar null em caso de não encontrar o course especificado', async () => {
      const sut = makeSut()
      const course = await sut.get('1')
      expect(course).toBeNull()
    })
  })
})
