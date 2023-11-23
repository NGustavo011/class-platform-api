import { mockConsumerModel } from '../../../data/test/mock-consumer';
import { throwError } from '../../../domain/test/test-helpers';
import { AddConsumerContract } from '../../../domain/usecases-contracts/add-consumer';
import { HttpRequest } from '../../contracts/http';
import { ok, serverError } from '../../helpers/http/http-helper';
import { mockAddConsumer } from '../../test/mock-consumer';
import { AddConsumerController } from './add-consumer-controller';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			name: 'any_name',
			cpf: 'any_cpf'
		}
	};
};

interface SutTypes {
  sut: AddConsumerController,
  addConsumerStub: AddConsumerContract
}

const makeSut = (): SutTypes => {
	const addConsumerStub = mockAddConsumer();
	const sut = new AddConsumerController(addConsumerStub);
	return {
		sut,
		addConsumerStub
	};
};

describe('AddConsumer Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('AddConsumer dependency', () => {
		test('Deve chamar AddConsumer com valores corretos', async () => {
			const { sut, addConsumerStub } = makeSut();
			const addSpy = jest.spyOn(addConsumerStub, 'add');
			const request = mockRequest();
			await sut.execute(request);
			expect(addSpy).toHaveBeenCalledWith({
				name: request.body.name,
				cpf: request.body.cpf
			});
		});
		test('Deve retornar 500 se AddConsumer lançar uma exceção', async () => {
			const { sut, addConsumerStub } = makeSut();
			jest.spyOn(addConsumerStub, 'add').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockConsumerModel()));
	});
});