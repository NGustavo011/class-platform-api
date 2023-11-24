import { throwError } from '../../../domain/test/test-helpers';
import { AddCourseRepository } from '../../repositories-contracts/add-course-repository';
import { mockAddCourseParams, mockAddCourseRepository, mockCourseModel } from '../../test/mock-course';
import { AddCourse } from './add-course';



interface SutTypes {
    addCourseRepositoryStub: AddCourseRepository
    sut: AddCourse
  }
  
const makeSut = (): SutTypes => {
	const addCourseRepositoryStub = mockAddCourseRepository();
	const sut = new AddCourse(addCourseRepositoryStub);
	return {
		addCourseRepositoryStub,
		sut
	};
};

describe('AddCourse usecase', ()=>{
	describe('AddCourseRepository dependency', ()=>{
		test('Deve chamar AddCourseRepository com os valores corretos', async ()=>{
			const { sut, addCourseRepositoryStub } = makeSut();
			const addSpy = jest.spyOn(addCourseRepositoryStub, 'add');
			await sut.add(mockAddCourseParams());
			expect(addSpy).toHaveBeenCalledWith(mockAddCourseParams());
		});

		test('Deve repassar a exceção se o AddCourseRepository lançar um erro', async () => {
			const { sut, addCourseRepositoryStub } = makeSut();
			jest.spyOn(addCourseRepositoryStub, 'add').mockImplementationOnce(throwError);
			const promise = sut.add(mockAddCourseParams());
			await expect(promise).rejects.toThrow();
		});

		test('Deve retornar null se AddCourseRepository retornar null', async () => {
			const { sut, addCourseRepositoryStub } = makeSut();
			jest.spyOn(addCourseRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null));
			const course = await sut.add(mockAddCourseParams());
			expect(course).toBeNull();
		});
	});

	test('Deve retornar um AddCourseReturn com sucesso', async () => {
		const { sut } = makeSut();
		const course = await sut.add(mockAddCourseParams());
		expect(course).toEqual(mockCourseModel());
	});
});