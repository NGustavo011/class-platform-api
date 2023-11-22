import { throwError } from '../../../../domain/test/test-helpers';
import { GetConsumerRepository } from '../../../repositories-contracts/consumer/get-consumer-repository';
import { mockConsumerModel, mockGetConsumerParams, mockGetConsumerRepository } from '../../../test/mock-consumer';
import { GetConsumer } from './get-consumer';

interface SutTypes {
    getConsumerRepositoryStub: GetConsumerRepository
    sut: GetConsumer
  }
  
const makeSut = (): SutTypes => {
	const getConsumerRepositoryStub = mockGetConsumerRepository();
	const sut = new GetConsumer(getConsumerRepositoryStub);
	return {
		getConsumerRepositoryStub,
		sut
	};
};

describe('GetConsumer usecase', ()=>{
	describe('GetConsumerRepository dependency', ()=>{
		test('Deve chamar GetConsumerRepository com os valores corretos', async ()=>{
			const { sut, getConsumerRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getConsumerRepositoryStub, 'get');
			await sut.get(mockGetConsumerParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetConsumerParams());
		});

		test('Deve repassar a exceção se o GetConsumerRepository lançar um erro', async () => {
			const { sut, getConsumerRepositoryStub } = makeSut();
			jest.spyOn(getConsumerRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetConsumerParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetConsumerRepository retornar null', async () => {
			const { sut, getConsumerRepositoryStub } = makeSut();
			jest.spyOn(getConsumerRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const consumer = await sut.get(mockGetConsumerParams());
			expect(consumer).toBeNull();
		});
	});

	test('Deve retornar um GetConsumerReturn com sucesso', async () => {
		const { sut } = makeSut();
		const consumer = await sut.get(mockGetConsumerParams());
		expect(consumer).toEqual(mockConsumerModel());
	});
});