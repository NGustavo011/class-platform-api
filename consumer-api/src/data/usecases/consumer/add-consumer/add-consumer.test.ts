import { throwError } from '../../../../domain/test/test-helpers';
import { AddConsumerRepository } from '../../../repositories-contracts/consumer/add-consumer-repository';
import { mockAddConsumerParams, mockAddConsumerRepository, mockConsumerModel } from '../../../test/mock-consumer';
import { AddConsumer } from './add-consumer';



interface SutTypes {
    addConsumerRepositoryStub: AddConsumerRepository
    sut: AddConsumer
  }
  
const makeSut = (): SutTypes => {
	const addConsumerRepositoryStub = mockAddConsumerRepository();
	const sut = new AddConsumer(addConsumerRepositoryStub);
	return {
		addConsumerRepositoryStub,
		sut
	};
};

describe('AddConsumer usecase', ()=>{
	describe('AddConsumerRepository dependency', ()=>{
		test('Deve chamar AddConsumerRepository com os valores corretos', async ()=>{
			const { sut, addConsumerRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(addConsumerRepositoryStub, 'add');
			await sut.add(mockAddConsumerParams());
			expect(addSpy).toHaveBeenCalledWith(mockAddConsumerParams());
		});

		test('Deve repassar a exceção se o AddConsumerRepository lançar um erro', async () => {
			const { sut, addConsumerRepositoryStub } = makeSut();
			jest.spyOn(addConsumerRepositoryStub, 'add').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddConsumerParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se AddConsumerRepository retornar null', async () => {
			const { sut, addConsumerRepositoryStub } = makeSut();
			jest.spyOn(addConsumerRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null));
			const consumer = await sut.add(mockAddConsumerParams());
			expect(consumer).toBeNull();
		});
	});

	test('Deve retornar um AddConsumerReturn com sucesso', async () => {
		const { sut } = makeSut();
		const consumer = await sut.add(mockAddConsumerParams());
		expect(consumer).toEqual(mockConsumerModel());
	});
});