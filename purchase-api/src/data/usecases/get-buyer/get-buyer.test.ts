import { throwError } from '../../../domain/test/test-helpers';
import { GetBuyerRepository } from '../../repositories-contracts/get-buyer-repository';
import { mockGetBuyerParams, mockGetBuyerRepository, mockBuyerModel } from '../../test/mock-buyer';
import { GetBuyer } from './get-buyer';

interface SutTypes {
    getBuyerRepositoryStub: GetBuyerRepository
    sut: GetBuyer
}
  
const makeSut = (): SutTypes => {
	const getBuyerRepositoryStub = mockGetBuyerRepository();
	const sut = new GetBuyer(getBuyerRepositoryStub);
	return {
		getBuyerRepositoryStub,
		sut
	};
};

describe('GetBuyer usecase', ()=>{
	describe('GetBuyerRepository dependency', ()=>{
		test('Deve chamar GetBuyerRepository com os valores corretos', async ()=>{
			const { sut, getBuyerRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getBuyerRepositoryStub, 'get');
			await sut.get(mockGetBuyerParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetBuyerParams());
		});

		test('Deve repassar a exceção se o GetBuyerRepository lançar um erro', async () => {
			const { sut, getBuyerRepositoryStub } = makeSut();
			jest.spyOn(getBuyerRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetBuyerParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetBuyerRepository retornar null', async () => {
			const { sut, getBuyerRepositoryStub } = makeSut();
			jest.spyOn(getBuyerRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const buyer = await sut.get(mockGetBuyerParams());
			expect(buyer).toBeNull();
		});
	});

	test('Deve retornar um GetBuyerReturn com sucesso', async () => {
		const { sut } = makeSut();
		const buyer = await sut.get(mockGetBuyerParams());
		expect(buyer).toEqual(mockBuyerModel());
	});
});