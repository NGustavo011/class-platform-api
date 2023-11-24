import { type GetCourseRepository } from '../../../../data/repositories-contracts/get-course-repository'
import { GetCourseParams, GetCourseReturn } from '../../../../domain/usecases-contracts/get-course'
import env from '../../../../main/config/env'
import { type HttpClient } from '../../contract/http-client'

export class CourseHttpClient implements GetCourseRepository {
  constructor (private readonly httpClient: HttpClient) {
  }

  async get (id: GetCourseParams): Promise<GetCourseReturn | null> {
    try {
      const response = await this.httpClient.get(`${env.courseApiUrl}course/${id}`)
      return {
        id: response.id,
        name: response.name,
        description: response.description
      }
    } catch (error) {
      return null
    }
  }
}
