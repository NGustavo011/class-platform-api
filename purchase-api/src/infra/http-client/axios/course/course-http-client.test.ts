import { AxiosAdapter } from '../../adapters/axios-adapter'
import { CourseHttpClient } from './course-http-client'

const makeSut = (): CourseHttpClient => {
  return new CourseHttpClient(new AxiosAdapter())
}

describe('CourseHttpClient', () => {
  describe('get()', () => {
    test('Deve retornar dados de um course corretamente em caso de sucesso', async () => {
      const sut = makeSut()
      const course = await sut.get('70e8abe1-e9ea-44ee-96d1-2d90fd03f802')
      expect(course).toBeTruthy()
      expect(course?.id).toBe('70e8abe1-e9ea-44ee-96d1-2d90fd03f802')
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
