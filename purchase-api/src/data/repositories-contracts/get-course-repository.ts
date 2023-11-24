import { CourseModel } from '../../domain/models/course'

export interface GetCourseRepository {
  get: (id: string) => Promise<CourseModel | null>
}
