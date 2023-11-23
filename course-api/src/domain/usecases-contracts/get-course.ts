import { CourseModel } from '../models/course';

export interface GetCourseParams {
  id: string
}
export type GetCourseReturn = CourseModel

export interface GetCourseContract {
  get: (getCourseParams: GetCourseParams) => Promise<GetCourseReturn | null>
}
