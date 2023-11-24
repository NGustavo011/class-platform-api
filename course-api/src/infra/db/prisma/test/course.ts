import { mockCourseModel } from "../../../../data/test/mock-course"
import { prisma } from "../../../../main/config/prisma";

export const mockPrismaCourse = async (): Promise<void> => {
    const courseModel = mockCourseModel();
    await prisma.course.create({
        data: {
            id: "course_id_1",
            name: courseModel.name,
            description: courseModel.description
        }
    })
}