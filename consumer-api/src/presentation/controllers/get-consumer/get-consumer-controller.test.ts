import { mockConsumerModel } from '../../../data/test/mock-consumer';
import { throwError } from '../../../domain/test/test-helpers';
import { GetConsumerContract } from '../../../domain/usecases-contracts/get-consumer';
import { HttpRequest } from '../../contracts/http';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import { mockGetConsumer } from '../../test/mock-consumer';
import { GetConsumerController } from './get-consumer-controller';

const mockRequest = (): HttpRequest => {
	return {
		params: {
            id: "valid_id"
        }
	};
};

interface SutTypes {
  sut: GetConsumerController,
  getConsumerStub: GetConsumerContract
}

const makeSut = (): SutTypes => {
	const getConsumerStub = mockGetConsumer();
	const sut = new GetConsumerController(getConsumerStub);
	return {
		sut,
		getConsumerStub
	};
};

describe('GetConsumer Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('GetConsumer dependency', () => {
		test('Deve chamar GetConsumer com valores corretos', async () => {
			const { sut, getConsumerStub } = makeSut();
			const getSpy = jest.spyOn(getConsumerStub, 'get');
			const request = mockRequest();
			await sut.execute(request);
			expect(getSpy).toHaveBeenCalledWith({
				id: request.params.id
			});
		});
		test('Deve retornar 500 se GetConsumer lançar uma exceção', async () => {
			const { sut, getConsumerStub } = makeSut();
			jest.spyOn(getConsumerStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
    test('Retorne status 400 se o dado provido for inválido', async () => {
		const { sut, getConsumerStub } = makeSut();
		jest.spyOn(getConsumerStub, 'get').mockImplementationOnce(()=>{return Promise.resolve(null)})
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
		expect(httpResponse).toEqual(ok(mockConsumerModel()));
	});
});