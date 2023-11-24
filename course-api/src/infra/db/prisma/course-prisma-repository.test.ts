import { mockAddCourseParams, mockCourseModel } from "../../../data/test/mock-course";
import { AddCourseReturn } from "../../../domain/usecases-contracts/add-course";
import { GetCourseReturn } from "../../../domain/usecases-contracts/get-course";
import { prisma } from "../../../main/config/prisma";
import { CoursePrismaRepository } from "./course-prisma-repository";
import { clearDatabase } from "./test/clear-database";
import { mockPrismaCourse } from "./test/course";

const makeSut = (): CoursePrismaRepository => {
	return new CoursePrismaRepository();
};

describe('CoursePrismaRepository', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});

	describe('add()', () => {
		test('Deve retornar um curso em caso de sucesso no método de add', async () => {
			const sut = makeSut();
			const addCourseParams = mockAddCourseParams();
			const course = await sut.add(addCourseParams) as AddCourseReturn;
			expect(course).toBeTruthy();
			expect(course.id).toBeTruthy();
			expect(course.name).toBe(addCourseParams.name);
			expect(course.description).toBe(addCourseParams.description);
			const newCourses = await prisma.course.findMany({});
			expect(newCourses[0].id).toBe(course.id);
		});
	});

	describe('get()', ()=>{
		test('Deve retornar um único curso em caso de especificar o id', async () => {
			const sut = makeSut();
            const courseModel = mockCourseModel();
			await mockPrismaCourse();
			const course = await sut.get({ id: 'course_id_1'}) as GetCourseReturn;
			expect(course).toBeTruthy();
			expect(course.name).toBe(courseModel.name);
			expect(course.description).toBe(courseModel.description);
			expect(course.id).toBe('course_id_1');
		});
        test('Deve retornar null em caso de não encontrar o curso', async () => {
			const sut = makeSut();
			await mockPrismaCourse();
			const courses = await sut.get({ id: 'course_id_2'}) as GetCourseReturn;
			expect(courses).toBeNull();
		});
	});
});