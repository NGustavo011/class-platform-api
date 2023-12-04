import request from 'supertest';
import { prisma } from '../../config/prisma';
import { app } from '../../config/app';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';

describe('Order Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('POST /order', () => {
		test('Deve retornar status code 200 em caso de sucesso no CreateOrder', async () => {
			await request(app).post('/order').send({
				buyerId: '84e87f8c-d375-43a1-b077-0fbe8369fa7c',
				courseId: '70e8abe1-e9ea-44ee-96d1-2d90fd03f802'
			}).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no CreateOrder', async () => {
			await request(app).post('/order').send({
				buyerId: '84e87f8c-d375-43a1-b077-0fbe8369fa7c',
				courseId: 'invalid_course_id'
			}).expect(400);
		});
	});

});
