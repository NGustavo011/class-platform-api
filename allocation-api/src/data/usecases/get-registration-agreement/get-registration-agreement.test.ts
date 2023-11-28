import { throwError } from '../../../domain/test/test-helpers';
import { GetAllRegistrationAgreementRepository } from '../../repositories-contracts/get-all-registration-agreement-repository';
import { GetRegistrationAgreementRepository } from '../../repositories-contracts/get-registration-agreement-repository';
import { mockGetAllRegistrationAgreementRepository, mockGetRegistrationAgreementRepository } from '../../test/mock-registration-agreement';
import { GetRegistrationAgreement } from './get-registration-agreement';
import { mockGetRegistrationAgreementParams, mockRegistrationAgreementModel } from '../../test/mock-registration-agreement';
import MockDate from 'mockdate';

interface SutTypes {
    getRegistrationAgreementRepositoryStub: GetRegistrationAgreementRepository,
	getAllRegistrationAgreementRepositoryStub: GetAllRegistrationAgreementRepository,
    sut: GetRegistrationAgreement
}
  
const makeSut = (): SutTypes => {
	const getRegistrationAgreementRepositoryStub = mockGetRegistrationAgreementRepository();
	const getAllRegistrationAgreementRepositoryStub = mockGetAllRegistrationAgreementRepository();
	const sut = new GetRegistrationAgreement(getRegistrationAgreementRepositoryStub, getAllRegistrationAgreementRepositoryStub);
	return {
		getRegistrationAgreementRepositoryStub,
		getAllRegistrationAgreementRepositoryStub,
		sut
	};
};

describe('GetRegistrationAgreement usecase', ()=>{
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('GetRegistrationAgreementRepository dependency', ()=>{
		test('Deve chamar GetRegistrationAgreementRepository com os valores corretos', async ()=>{
			const { sut, getRegistrationAgreementRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getRegistrationAgreementRepositoryStub, 'get');
			await sut.get(mockGetRegistrationAgreementParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetRegistrationAgreementParams());
		});

		test('Deve repassar a exceção se o GetRegistrationAgreementRepository lançar um erro', async () => {
			const { sut, getRegistrationAgreementRepositoryStub } = makeSut();
			jest.spyOn(getRegistrationAgreementRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetRegistrationAgreementParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetRegistrationAgreementRepository retornar null', async () => {
			const { sut, getRegistrationAgreementRepositoryStub } = makeSut();
			jest.spyOn(getRegistrationAgreementRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const registrationAgreement = await sut.get(mockGetRegistrationAgreementParams());
			expect(registrationAgreement).toBeNull();
		});
	});

	describe('GetAllRegistrationAgreementRepository dependency', ()=>{
		test('Deve chamar GetAllRegistrationAgreementRepository com os valores corretos', async ()=>{
			const { sut, getAllRegistrationAgreementRepositoryStub } = makeSut();
			const getAllSpy = jest.spyOn(getAllRegistrationAgreementRepositoryStub, 'getAll');
			await sut.get();
			expect(getAllSpy).toHaveBeenCalledWith();
		});

		test('Deve repassar a exceção se o GetAllRegistrationAgreementRepository lançar um erro', async () => {
			const { sut, getAllRegistrationAgreementRepositoryStub } = makeSut();
			jest.spyOn(getAllRegistrationAgreementRepositoryStub, 'getAll').mockImplementationOnce(throwError);
			const promise = sut.get();
			await expect(promise).rejects.toThrow();
		});
	});

	test('Deve retornar um GetRegistrationAgreementReturn com sucesso', async () => {
		const { sut } = makeSut();
		const registrationAgreement = await sut.get(mockGetRegistrationAgreementParams());
		expect(registrationAgreement).toEqual([mockRegistrationAgreementModel()]);
	});
});