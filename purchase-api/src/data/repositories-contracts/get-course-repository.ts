import { CourseModel } from '../../domain/models/course'
import { GetCourseParams, GetCourseReturn } from '../../domain/usecases-contracts/get-course'

export interface GetCourseRepository {
  get: (id: GetCourseParams) => Promise<GetCourseReturn | null>
}
