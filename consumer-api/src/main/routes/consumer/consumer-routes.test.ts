import request from 'supertest';
import { prisma } from '../../config/prisma';
import { app } from '../../config/app';
import { clearDatabase } from '../../../infra/db/prisma/test/clear-database';

type ConsumerData = {
	consumerId: string
}

const mockConsumer = async (): Promise<ConsumerData> => {
	const consumer = await prisma.consumer.create({
		data: {
			name: 'Gustavo Nogueira',
			cpf: 'xxx.xxx.xxx-xx'
		}
	});
	return {
		consumerId: consumer.id
	};
};

describe('Consumer Routes', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /consumer/:id', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetConsumer', async () => {
			const { consumerId } = await mockConsumer();
			await request(app).get(`/consumer/${consumerId}`).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no GetConsumer', async () => {
			await request(app).get(`/consumer/${2}`).expect(400);
		});
	});
	describe('POST /consumer', () => {
		test('Deve retornar status code 200 em caso de sucesso no CreateConsumer', async () => {
			await request(app).post('/consumer').send({
				name: 'Elizabeth Nogueira',
				cpf: 'yyy.yyy.yyy-yy'
			}).expect(200);
		});
	});

});
