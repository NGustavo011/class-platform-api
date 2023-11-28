import { AxiosAdapter } from '../../adapters/axios-adapter'
import { CourseHttpClient } from './course-http-client'

const makeSut = (): CourseHttpClient => {
  return new CourseHttpClient(new AxiosAdapter())
}

describe('CourseHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um course corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const course = await sut.get('c8eaf6c1-756d-4902-838b-9d51e7a1d404')
      expect(course).toBeTruthy()
      expect(course?.id).toBe('c8eaf6c1-756d-4902-838b-9d51e7a1d404')
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
