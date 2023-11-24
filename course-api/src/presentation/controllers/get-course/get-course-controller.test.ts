import { mockCourseModel } from '../../../data/test/mock-course';
import { throwError } from '../../../domain/test/test-helpers';
import { GetCourseContract } from '../../../domain/usecases-contracts/get-course';
import { HttpRequest } from '../../contracts/http';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import { mockGetCourse } from '../../test/mock-course';
import { GetCourseController } from './get-course-controller';

const mockRequest = (): HttpRequest => {
	return {
		params: {
            id: "valid_id"
        }
	};
};

interface SutTypes {
  sut: GetCourseController,
  getCourseStub: GetCourseContract
}

const makeSut = (): SutTypes => {
	const getCourseStub = mockGetCourse();
	const sut = new GetCourseController(getCourseStub);
	return {
		sut,
		getCourseStub
	};
};

describe('GetCourse Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('GetCourse dependency', () => {
		test('Deve chamar GetCourse com valores corretos', async () => {
			const { sut, getCourseStub } = makeSut();
			const getSpy = jest.spyOn(getCourseStub, 'get');
			const request = mockRequest();
			await sut.execute(request);
			expect(getSpy).toHaveBeenCalledWith({
				id: request.params.id
			});
		});
		test('Deve retornar 500 se GetCourse lançar uma exceção', async () => {
			const { sut, getCourseStub } = makeSut();
			jest.spyOn(getCourseStub, 'get').mockImplementationOnce(throwError);
			const httpResponse = await sut.execute(mockRequest());
			expect(httpResponse).toEqual(serverError(new Error()));
		});
	});
    test('Retorne status 400 se o dado provido for inválido', async () => {
		const { sut, getCourseStub } = makeSut();
		jest.spyOn(getCourseStub, 'get').mockImplementationOnce(()=>{return Promise.resolve(null)})
        const httpResponse = await sut.execute({
            params: {
                id: "invalid_id"
            }
        });
		expect(httpResponse).toEqual(badRequest(new InvalidParamError("id")));
	});
	test('Retorne status 200 se o dado provido for válido', async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.execute(mockRequest());
		expect(httpResponse).toEqual(ok(mockCourseModel()));
	});
});