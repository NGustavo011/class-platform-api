import request from 'supertest';
import { prisma } from '../../config/prisma';
import { app } from '../../config/app';
import { clearDatabase } from '../../../infra/test/prisma/clear-database';

describe('RegistrationAgreement Routes', () => {

	const mockRegistrationAgreement = async (): Promise<string> => {
		const newRegistrationAgreement = await prisma.registrationAgreement.create({
			data: {
				buyerId: "1",
				courseId: "1",
				orderId: "1"
			}
		})
		return newRegistrationAgreement.id;
	}

	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});
	describe('GET /registration-agreement', () => {
		test('Deve retornar status code 200 em caso de sucesso no GetRegistrationAgreement sem enviar parametros', async () => {
			await request(app).get('/registration-agreement').expect(200);
		});
		test('Deve retornar status code 200 em caso de sucesso no GetRegistrationAgreement ao enviar parametros', async () => {
			const id = await mockRegistrationAgreement();
			await request(app).get(`/registration-agreement/${id}`).expect(200);
		});
        test('Deve retornar status code 400 em caso de falha no GetRegistrationAgreement ao enviar parametros inválidos', async () => {
			await request(app).get('/registration-agreement/any_id').expect(400);
		});
	});

});
