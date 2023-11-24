import { CourseModel } from '../models/course';

export type GetCourseParams = string
export type GetCourseReturn = CourseModel

export interface GetCourseContract {
    get: (getCourseParams: GetCourseParams) => Promise<GetCourseReturn | null>
}