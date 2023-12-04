import { mockOrderModel } from '../../../data/test/mock-order';
import { throwError } from '../../../domain/test/test-helpers';
import { CreateOrderContract } from '../../../domain/usecases-contracts/create-order';
import { GetBuyerContract } from '../../../domain/usecases-contracts/get-buyer';
import { GetCourseContract } from '../../../domain/usecases-contracts/get-course';
import { HttpRequest } from '../../contracts/http';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import { mockGetBuyer } from '../../test/mock-buyer';
import { mockGetCourse } from '../../test/mock-course';
import { mockCreateOrder } from '../../test/mock-order';
import { CreateOrderController } from './create-order-controller';
import { mockRabbitmqServer, mockRabbitmqQueue, mockRabbitmqExchange, mockRabbitmqRoutingKey } from "../../test/mock-rabbitmq"
import { describe } from 'node:test';
import RabbitmqServer from '../../../main/rabbitmq-server';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			buyerId: 'any_buyer_id',
			courseId: 'any_course_id'
		}
	};
};

interface SutTypes {
  sut: CreateOrderController,
  getBuyerStub: GetBuyerContract,
  getCourseStub: GetCourseContract,
  createOrderStub: CreateOrderContract,
  rabbitmqServer: RabbitmqServer,
  rabbitmqQueue: string,
  rabbitmqExchange: string,
  rabbitmqRoutingKey: string
}

const makeSut = (): SutTypes => {
	const getBuyerStub = mockGetBuyer();
	const getCourseStub = mockGetCourse();
	const createOrderStub = mockCreateOrder();
	const rabbitmqServer = mockRabbitmqServer();
	const rabbitmqQueue = mockRabbitmqQueue();
	const rabbitmqExchange = mockRabbitmqExchange();
	const rabbitmqRoutingKey = mockRabbitmqRoutingKey();
	const sut = new CreateOrderController(getBuyerStub, getCourseStub, createOrderStub, rabbitmqServer, rabbitmqQueue, rabbitmqExchange, rabbitmqRoutingKey);
	return {
		sut,
		getBuyerStub,
		getCourseStub,
		createOrderStub,
		rabbitmqServer,
		rabbitmqQueue,
		rabbitmqExchange,
		rabbitmqRoutingKey
	};
};

describe('CreateOrder Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('GetBuyer dependency', () => {
		test('Deve chamar GetBuyer com valores corretos', async () => {
			const { sut, getBuyerStub } = makeSut();
			const getSpy = jest.spyOn(getBuyerStub, 'get');
			const request = mockRequest();
			await sut.execute(request);
			expect(getSpy).toHaveBeenCalledWith(request.body.buyerId);
		});
		test('Deve retornar 500 se GetBuyer lançar uma exceção', async () => {
			const { sut, getBuyerStub } = makeSut();
			jest.spyOn(getBuyerStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
		test('Deve retornar 400 se GetBuyer retornar null', async () => {
			const { sut, getBuyerStub } = makeSut();
			jest.spyOn(getBuyerStub, 'get').mockImplementationOnce(()=>{return Promise.resolve(null)});
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError("buyerId")));
		});
	});
	describe('GetCourse dependency', () => {
		test('Deve chamar GetCourse com valores corretos', async () => {
			const { sut, getCourseStub } = makeSut();
			const getSpy = jest.spyOn(getCourseStub, 'get');
			const request = mockRequest();
			await sut.execute(request);
			expect(getSpy).toHaveBeenCalledWith(request.body.courseId);
		});
		test('Deve retornar 500 se GetCourse lançar uma exceção', async () => {
			const { sut, getCourseStub } = makeSut();
			jest.spyOn(getCourseStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
		test('Deve retornar 400 se GetCourse retornar null', async () => {
			const { sut, getCourseStub } = makeSut();
			jest.spyOn(getCourseStub, 'get').mockImplementationOnce(()=>{return Promise.resolve(null)});
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(badRequest(new InvalidParamError("courseId")));
		});
	});
	describe('CreateOrder dependency', () => {
		test('Deve chamar CreateOrder com valores corretos', async () => {
			const { sut,  getBuyerStub, getCourseStub, createOrderStub } = makeSut();
			const createSpy = jest.spyOn(createOrderStub, 'create');
			const request = mockRequest();
			await sut.execute(request);
			expect(createSpy).toHaveBeenCalledWith({
				buyerId: request.body.buyerId,
				courseId: request.body.courseId,
				buyer: await getBuyerStub.get(request.body.buyerId),
				course: await getCourseStub.get(request.body.courseId)
			});
		});
		test('Deve retornar 500 se CreateOrder lançar uma exceção', async () => {
			const { sut, createOrderStub } = makeSut();
			jest.spyOn(createOrderStub, 'create').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	describe('RabbitmqServer dependecy', ()=> {
		test('Se for passado RabbitmqServer e RabbitmqQueue deve chamar o método do publishInQueue', async () => {
			const { sut, rabbitmqServer, rabbitmqQueue } = makeSut();
			const publishInQueueSpy = jest.spyOn(rabbitmqServer as RabbitmqServer, 'publishInQueue');
			const request = mockRequest();
			await sut.execute(request);
			expect(rabbitmqServer).not.toBeNull()
			expect(rabbitmqQueue).not.toBeNull()
			expect(publishInQueueSpy).toHaveBeenCalled()
		});

		test('Se for passado RabbitmqServer, RabbitmqExchange e RabbitmqRoutingKey deve chamar o método do publishInExchange', async () => {
			const { sut, rabbitmqServer, rabbitmqExchange, rabbitmqRoutingKey } = makeSut();
			const publishInExchangeSpy = jest.spyOn(rabbitmqServer as RabbitmqServer, 'publishInExchange');
			const request = mockRequest();
			await sut.execute(request);
			expect(rabbitmqServer).not.toBeNull()
			expect(rabbitmqExchange).not.toBeNull()
			expect(rabbitmqRoutingKey).not.toBeNull()
			expect(publishInExchangeSpy).toHaveBeenCalled()
		});
	})
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockOrderModel()));
	});
});