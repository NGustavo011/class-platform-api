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
				buyerId: 'e1ec5061-4954-43b3-8d05-61094b62920c',
				courseId: '2e865aef-c4a4-4cba-9f3a-3c257f331028'
			}).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no CreateOrder', async () => {
			await request(app).post('/order').send({
				buyerId: 'e1ec5061-4954-43b3-8d05-61094b62920c',
				courseId: 'invalid_course_id'
			}).expect(400);
		});
	});

});
