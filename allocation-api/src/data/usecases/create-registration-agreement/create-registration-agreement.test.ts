import { throwError } from '../../../domain/test/test-helpers';
import { CreateRegistrationAgreementRepository } from '../../repositories-contracts/create-registration-agreement-repository';
import { mockCreateRegistrationAgreementParams, mockCreateRegistrationAgreementRepository, mockRegistrationAgreementModel } from '../../test/mock-registration-agreement';
import { CreateRegistrationAgreement } from './create-registration-agreement';
import MockDate from 'mockdate';

interface SutTypes {
    createRegistrationAgreementRepositoryStub: CreateRegistrationAgreementRepository
    sut: CreateRegistrationAgreement
}
  
const makeSut = (): SutTypes => {
	const createRegistrationAgreementRepositoryStub = mockCreateRegistrationAgreementRepository();
	const sut = new CreateRegistrationAgreement(createRegistrationAgreementRepositoryStub);
	return {
		createRegistrationAgreementRepositoryStub,
		sut
	};
};

describe('CreateRegistrationAgreement usecase', ()=>{
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('CreateRegistrationAgreementRepository dependency', ()=>{
		test('Deve chamar CreateRegistrationAgreementRepository com os valores corretos', async ()=>{
			const { sut, createRegistrationAgreementRepositoryStub } = makeSut();
			const createSpy = jest.spyOn(createRegistrationAgreementRepositoryStub, 'create');
			await sut.create(mockCreateRegistrationAgreementParams());
			expect(createSpy).toHaveBeenCalledWith(mockCreateRegistrationAgreementParams());
		});

		test('Deve repassar a exceção se o CreateRegistrationAgreementRepository lançar um erro', async () => {
			const { sut, createRegistrationAgreementRepositoryStub } = makeSut();
			jest.spyOn(createRegistrationAgreementRepositoryStub, 'create').mockImplementationOnce(throwError);
			const promise = sut.create(mockCreateRegistrationAgreementParams());
			await expect(promise).rejects.toThrow();
		});
	});

	test('Deve retornar um CreateRegistrationAgreementReturn com sucesso', async () => {
		const { sut } = makeSut();
		const registrationAgreement = await sut.create(mockCreateRegistrationAgreementParams());
		expect(registrationAgreement).toEqual(mockRegistrationAgreementModel());
	});
});