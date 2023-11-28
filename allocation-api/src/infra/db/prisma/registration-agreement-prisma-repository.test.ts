import { prisma } from '../../../main/config/prisma';
import { RegistrationAgreementPrismaRepository } from './registration-agreement-prisma-repository';
import { clearDatabase } from '../../test/prisma/clear-database';
import { mockPrismaRegistrationAgreement } from '../../test/prisma/registration-agreement';
import { mockCreateRegistrationAgreementParams, mockGetRegistrationAgreementParams, mockRegistrationAgreementModel } from '../../../data/test/mock-registration-agreement';
import { RegistrationAgreementModel } from '../../../domain/models/registration-agreement';

const makeSut = (): RegistrationAgreementPrismaRepository => {
	return new RegistrationAgreementPrismaRepository();
};

describe('RegistrationAgreementPrismaRepository', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});

	describe('create()', () => {
		test('Deve retornar um contrato de registro em caso de sucesso no método de create', async () => {
			const sut = makeSut();
			const createRegistrationAgreementParams = mockCreateRegistrationAgreementParams();
			const registrationAgreement = await sut.create(createRegistrationAgreementParams);
			expect(registrationAgreement).toBeTruthy();
			expect(registrationAgreement.id).toBeTruthy();
			expect(registrationAgreement.buyerId).toBe(createRegistrationAgreementParams.buyerId);
			expect(registrationAgreement.courseId).toBe(createRegistrationAgreementParams.courseId);
			const newRegistrationsAgreement = await prisma.registrationAgreement.findMany({});
			expect(newRegistrationsAgreement[0].id).toBe(registrationAgreement.id);
		});
	});

	describe('get()', ()=>{
		test('Deve retornar um único contrato de registro em caso de especificar o id', async () => {
			const sut = makeSut();
            const registrationAgreementIdSearch = mockGetRegistrationAgreementParams() as string;
			const registrationAgreementModel = mockRegistrationAgreementModel()
			await mockPrismaRegistrationAgreement();
			const registrationAgreement = await sut.get(registrationAgreementIdSearch) as RegistrationAgreementModel;
			expect(registrationAgreement).toBeTruthy();
			expect(registrationAgreement.buyerId).toBe(registrationAgreementModel.buyerId);
			expect(registrationAgreement.courseId).toBe(registrationAgreementModel.courseId);
			expect(registrationAgreement.id).toBe('any_registration_agreement_id');
		});
        test('Deve retornar null em caso de não encontrar o curso', async () => {
			const sut = makeSut();
			await mockPrismaRegistrationAgreement();
			const registrationAgreements = await sut.get('registrationAgreement_id_2');
			expect(registrationAgreements).toBeNull();
		});
	});

	describe('getAll()', ()=>{
		test('Deve retornar todos os contratos de registro', async () => {
			const sut = makeSut();
			await mockPrismaRegistrationAgreement();
			const registrationAgreement = await sut.getAll();
			expect(registrationAgreement).toBeTruthy();
			expect(registrationAgreement.length).toBe(1);
		});
	});
});