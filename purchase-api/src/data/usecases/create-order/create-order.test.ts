import { throwError } from '../../../domain/test/test-helpers';
import { CreateOrderRepository } from '../../repositories-contracts/create-order-repository';
import { mockCreateOrderParams, mockCreateOrderRepository, mockOrderModel } from '../../test/mock-order';
import { CreateOrder } from './create-order';

interface SutTypes {
    createOrderRepositoryStub: CreateOrderRepository
    sut: CreateOrder
}
  
const makeSut = (): SutTypes => {
	const createOrderRepositoryStub = mockCreateOrderRepository();
	const sut = new CreateOrder(createOrderRepositoryStub);
	return {
		createOrderRepositoryStub,
		sut
	};
};

describe('CreateOrder usecase', ()=>{
	describe('CreateOrderRepository dependency', ()=>{
		test('Deve chamar CreateOrderRepository com os valores corretos', async ()=>{
			const { sut, createOrderRepositoryStub } = makeSut();
			const createSpy = jest.spyOn(createOrderRepositoryStub, 'create');
			await sut.create(mockCreateOrderParams());
			expect(createSpy).toHaveBeenCalledWith(mockCreateOrderParams());
		});

		test('Deve repassar a exceção se o CreateOrderRepository lançar um erro', async () => {
			const { sut, createOrderRepositoryStub } = makeSut();
			jest.spyOn(createOrderRepositoryStub, 'create').mockImplementationOnce(throwError);
			const promise = sut.create(mockCreateOrderParams());
			await expect(promise).rejects.toThrow();
		});
	});

	test('Deve retornar um CreateOrderReturn com sucesso', async () => {
		const { sut } = makeSut();
		const order = await sut.create(mockCreateOrderParams());
		expect(order).toEqual(mockOrderModel());
	});
});