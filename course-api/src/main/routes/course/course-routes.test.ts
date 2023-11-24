import request from 'supertest';
import { prisma } from '../../config/prisma';
import { app } from '../../config/app';
import { clearDatabase } from '../../../infra/db/prisma/test/clear-database';

type CourseData = {
	courseId: string
}

const mockCourse = async (): Promise<CourseData> => {
	const course = await prisma.course.create({
		data: {
			name: 'Curso legal',
			description: "Curso bem legal mesmo."
		}
	});
	return {
		courseId: course.id
	};
};

describe('Course Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /course/:id', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetCourse', async () => {
			const { courseId } = await mockCourse();
			await request(app).get(`/course/${courseId}`).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no GetCourse', async () => {
			await request(app).get(`/course/${2}`).expect(400);
		});
	});
	describe('POST /course', () => {
		test('Deve retornar status code 200 em caso de sucesso no CreateCourse', async () => {
			await request(app).post('/course').send({
				name: 'Curso chato',
				description: "Curso bem chato mesmo."
			}).expect(200);
		});
	});

});
