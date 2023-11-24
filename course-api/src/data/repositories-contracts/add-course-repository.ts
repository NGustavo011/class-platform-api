import { AddCourseParams, AddCourseReturn } from '../../domain/usecases-contracts/add-course';

export interface AddCourseRepository {
  add: (addCourseParams: AddCourseParams) => Promise<AddCourseReturn | null>
}
