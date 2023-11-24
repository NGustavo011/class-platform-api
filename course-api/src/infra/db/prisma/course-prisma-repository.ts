import { AddCourseRepository } from "../../../data/repositories-contracts/add-course-repository";
import { GetCourseRepository } from "../../../data/repositories-contracts/get-course-repository";
import { CourseModel } from "../../../domain/models/course";
import { AddCourseParams } from "../../../domain/usecases-contracts/add-course";
import { GetCourseParams } from "../../../domain/usecases-contracts/get-course";
import { prisma } from "../../../main/config/prisma";

export class CoursePrismaRepository implements AddCourseRepository, GetCourseRepository {
    
    async add(addCourseParams: AddCourseParams): Promise<CourseModel | null> {
        const { name, description } = addCourseParams;
        const course = await prisma.course.create({
            data: {
                name,
                description
            }
        });
        return course;
    }
    
    async get(getCourseParams: GetCourseParams): Promise<CourseModel | null> {
        const { id } = getCourseParams;
        const course = await prisma.course.findUnique({
            where: {
                id
            }
        });
        return course;
    }
}