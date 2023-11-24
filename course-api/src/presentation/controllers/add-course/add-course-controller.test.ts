import { mockCourseModel } from '../../../data/test/mock-course';
import { throwError } from '../../../domain/test/test-helpers';
import { AddCourseContract } from '../../../domain/usecases-contracts/add-course';
import { HttpRequest } from '../../contracts/http';
import { ok, serverError } from '../../helpers/http/http-helper';
import { mockAddCourse } from '../../test/mock-course';
import { AddCourseController } from './add-course-controller';

const mockRequest = (): HttpRequest => {
	return {
		body: {
			name: 'any_name',
			description: 'any_description'
		}
	};
};

interface SutTypes {
  sut: AddCourseController,
  addCourseStub: AddCourseContract
}

const makeSut = (): SutTypes => {
	const addCourseStub = mockAddCourse();
	const sut = new AddCourseController(addCourseStub);
	return {
		sut,
		addCourseStub
	};
};

describe('AddCourse Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('AddCourse dependency', () => {
		test('Deve chamar AddCourse com valores corretos', async () => {
			const { sut, addCourseStub } = makeSut();
			const addSpy = jest.spyOn(addCourseStub, 'add');
			const request = mockRequest();
			await sut.execute(request);
			expect(addSpy).toHaveBeenCalledWith({
				name: request.body.name,
				description: request.body.description
			});
		});
		test('Deve retornar 500 se AddCourse lançar uma exceção', async () => {
			const { sut, addCourseStub } = makeSut();
			jest.spyOn(addCourseStub, 'add').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockCourseModel()));
	});
});