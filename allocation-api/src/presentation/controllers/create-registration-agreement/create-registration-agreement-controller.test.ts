import { CreateRegistrationAgreementContract } from '../../../domain/usecases-contracts/create-registration-agreement';
import { CreateRegistrationAgreementController } from './create-registration-agreement-controller';
import { mockCreateRegistrationAgreement } from '../../test/mock-registration-agreement';
import { Message } from '../../../main/types/message'

const mockMessage = (): Message => {
	const messageObject = {
		buyerId: 'any_buyer_id',
		courseId: 'any_course_id',
		id: 'any_order_id'
	};
	const messageString = JSON.stringify(messageObject);
	const message = Buffer.from(messageString)
	return {
		content: message
	};
};

interface SutTypes {
  sut: CreateRegistrationAgreementController,
  createRegistrationAgreementStub: CreateRegistrationAgreementContract
}

const makeSut = (): SutTypes => {
	const createRegistrationAgreementStub = mockCreateRegistrationAgreement();
	const sut = new CreateRegistrationAgreementController(createRegistrationAgreementStub);
	return {
		sut,
		createRegistrationAgreementStub,
	};
};

describe('CreateRegistrationAgreement Controller', () => {
	const original = console.log;
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		console.log = original;
	});
	describe('CreateRegistrationAgreement dependency', () => {
		test('Deve chamar CreateRegistrationAgreement com valores corretos', async () => {
			const { sut,  createRegistrationAgreementStub } = makeSut();
			const createSpy = jest.spyOn(createRegistrationAgreementStub, 'create');
			const message = mockMessage();
			await sut.execute(message);
			const messageObject = JSON.parse(message.content.toString());
			expect(createSpy).toHaveBeenCalledWith({
				buyerId: messageObject.buyerId,
				courseId: messageObject.courseId,
				orderId: messageObject.id
			});
		});
	});
});