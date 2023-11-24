import { CourseModel } from '../models/course';

export type AddCourseParams = Omit<CourseModel, 'id'>
export type AddCourseReturn = CourseModel

export interface AddCourseContract {
    add: (addCourseParams: AddCourseParams) => Promise<AddCourseReturn | null>
}