import { GetCourseParams, GetCourseReturn } from '../../domain/usecases-contracts/get-course';

export interface GetCourseRepository {
  get: (getCourseParams: GetCourseParams) => Promise<GetCourseReturn | null>
}
