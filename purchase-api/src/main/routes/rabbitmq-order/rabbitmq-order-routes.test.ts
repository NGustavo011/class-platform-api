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
				buyerId: 'ca4a9e68-766f-43e2-a53a-489748fe07d5',
				courseId: 'c8eaf6c1-756d-4902-838b-9d51e7a1d404'
			}).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no CreateOrder', async () => {
			await request(app).post('/order').send({
				buyerId: 'ca4a9e68-766f-43e2-a53a-489748fe07d5',
				courseId: 'invalid_course_id'
			}).expect(400);
		});
	});

});
