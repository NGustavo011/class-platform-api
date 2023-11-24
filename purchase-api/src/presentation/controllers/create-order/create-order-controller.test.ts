import { mockBuyerModel } from '../../../data/test/mock-buyer';
import { mockCourseModel } from '../../../data/test/mock-course';
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
  createOrderStub: CreateOrderContract
}

const makeSut = (): SutTypes => {
	const getBuyerStub = mockGetBuyer();
	const getCourseStub = mockGetCourse();
	const createOrderStub = mockCreateOrder();
	const sut = new CreateOrderController(getBuyerStub, getCourseStub, createOrderStub);
	return {
		sut,
		getBuyerStub,
		getCourseStub,
		createOrderStub
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
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockOrderModel()));
	});
});