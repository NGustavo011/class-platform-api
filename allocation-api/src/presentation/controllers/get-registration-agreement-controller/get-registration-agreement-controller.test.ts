import { mockRegistrationAgreementModel } from '../../../data/test/mock-registration-agreement';
import { throwError } from '../../../domain/test/test-helpers';
import { GetRegistrationAgreementContract } from '../../../domain/usecases-contracts/get-registration-agreement';
import { HttpRequest } from '../../contracts/http';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import { mockGetRegistrationAgreement } from '../../test/mock-registration-agreement';
import { GetRegistrationAgreementController } from './get-registration-agreement-controller';
import MockDate from 'mockdate';

const mockRequest = (): HttpRequest => {
	return {
		params: {
            id: "valid_id"
        }
	};
};

interface SutTypes {
  sut: GetRegistrationAgreementController,
  getRegistrationAgreementStub: GetRegistrationAgreementContract
}

const makeSut = (): SutTypes => {
	const getRegistrationAgreementStub = mockGetRegistrationAgreement();
	const sut = new GetRegistrationAgreementController(getRegistrationAgreementStub);
	return {
		sut,
		getRegistrationAgreementStub
	};
};

describe('GetRegistrationAgreement Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
    beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	describe('GetRegistrationAgreement dependency', () => {
		test('Deve chamar GetRegistrationAgreement com valores corretos', async () => {
			const { sut, getRegistrationAgreementStub } = makeSut();
			const getSpy = jest.spyOn(getRegistrationAgreementStub, 'get');
			const request = mockRequest();
			await sut.execute(request);
			expect(getSpy).toHaveBeenCalledWith(request.params.id);
		});
		test('Deve retornar 500 se GetRegistrationAgreement lançar uma exceção', async () => {
			const { sut, getRegistrationAgreementStub } = makeSut();
			jest.spyOn(getRegistrationAgreementStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
    test('Retorne status 400 se o dado provido for inválido', async () => {
		const { sut, getRegistrationAgreementStub } = makeSut();
		jest.spyOn(getRegistrationAgreementStub, 'get').mockImplementationOnce(()=>{return Promise.resolve(null)})
        const httpResponse = await sut.execute({
            params: {
                id: "invalid_id"
            }
        });
		expect(httpResponse).toEqual(badRequest(new InvalidParamError("id")));
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok([mockRegistrationAgreementModel()]));
	});
});