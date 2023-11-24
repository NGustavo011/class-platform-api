import { throwError } from '../../../domain/test/test-helpers';
import { GetCourseRepository } from '../../repositories-contracts/get-course-repository';
import { mockGetCourseParams, mockGetCourseRepository, mockCourseModel } from '../../test/mock-course';
import { GetCourse } from './get-course';

interface SutTypes {
    getCourseRepositoryStub: GetCourseRepository
    sut: GetCourse
}
  
const makeSut = (): SutTypes => {
	const getCourseRepositoryStub = mockGetCourseRepository();
	const sut = new GetCourse(getCourseRepositoryStub);
	return {
		getCourseRepositoryStub,
		sut
	};
};

describe('GetCourse usecase', ()=>{
	describe('GetCourseRepository dependency', ()=>{
		test('Deve chamar GetCourseRepository com os valores corretos', async ()=>{
			const { sut, getCourseRepositoryStub } = makeSut();
			const getSpy = jest.spyOn(getCourseRepositoryStub, 'get');
			await sut.get(mockGetCourseParams());
			expect(getSpy).toHaveBeenCalledWith(mockGetCourseParams());
		});

		test('Deve repassar a exceção se o GetCourseRepository lançar um erro', async () => {
			const { sut, getCourseRepositoryStub } = makeSut();
			jest.spyOn(getCourseRepositoryStub, 'get').mockImplementationOnce(throwError);
			const promise = sut.get(mockGetCourseParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se GetCourseRepository retornar null', async () => {
			const { sut, getCourseRepositoryStub } = makeSut();
			jest.spyOn(getCourseRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(null));
			const course = await sut.get(mockGetCourseParams());
			expect(course).toBeNull();
		});
	});

	test('Deve retornar um GetCourseReturn com sucesso', async () => {
		const { sut } = makeSut();
		const course = await sut.get(mockGetCourseParams());
		expect(course).toEqual(mockCourseModel());
	});
});