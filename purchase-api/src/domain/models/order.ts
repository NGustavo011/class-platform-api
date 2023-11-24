import { BuyerModel } from "./buyer"
import { CourseModel } from "./course"

export interface OrderModel {
    id: string
    buyerId: string
    buyer: BuyerModel
    courseId: string
    course: CourseModel
}