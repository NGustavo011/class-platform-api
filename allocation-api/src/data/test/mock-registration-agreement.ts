import { RegistrationAgreementModel } from '../../domain/models/registration-agreement';
import { CreateRegistrationAgreementParams, CreateRegistrationAgreementReturn } from '../../domain/usecases-contracts/create-registration-agreement';
import { GetRegistrationAgreementParams, GetRegistrationAgreementReturn } from '../../domain/usecases-contracts/get-registration-agreement';
import { CreateRegistrationAgreementRepository } from '../repositories-contracts/create-registration-agreement-repository';
import { GetAllRegistrationAgreementRepository, GetAllRegistrationAgreementRepositoryReturn } from '../repositories-contracts/get-all-registration-agreement-repository';
import { GetRegistrationAgreementRepository, GetRegistrationAgreementRepositoryReturn } from '../repositories-contracts/get-registration-agreement-repository';

export const mockRegistrationAgreementModel = (): RegistrationAgreementModel => ({
    id: 'any_registration_agreement_id',
    buyerId: 'any_buyer_id',
	courseId: 'any_course_id',
	orderId: 'any_order_id',
	startDate: new Date(),
	endDate: new Date()
});

export const mockCreateRegistrationAgreementParams = (): CreateRegistrationAgreementParams => {
	return {
		buyerId: "any_buyer_id",
		courseId: "any_course_id",
		orderId: "any_order_id"
	}
}

export const mockGetRegistrationAgreementParams = (): GetRegistrationAgreementParams => {
	return "any_registration_agreement_id"
}

export const mockCreateRegistrationAgreementRepository = (): CreateRegistrationAgreementRepository => {
	class CreateRegistrationAgreementRepositoryStub implements CreateRegistrationAgreementRepository {
		async create(): Promise<CreateRegistrationAgreementReturn>{
			return await Promise.resolve(mockRegistrationAgreementModel());
		}
	}
	return new CreateRegistrationAgreementRepositoryStub();
};

export const mockGetRegistrationAgreementRepository = (): GetRegistrationAgreementRepository => {
	class GetRegistrationAgreementRepositoryStub implements GetRegistrationAgreementRepository {
		async get(): Promise<GetRegistrationAgreementRepositoryReturn>{
			return await Promise.resolve(mockRegistrationAgreementModel());
		}
	}
	return new GetRegistrationAgreementRepositoryStub();
};

export const mockGetAllRegistrationAgreementRepository = (): GetAllRegistrationAgreementRepository => {
	class GetAllRegistrationAgreementRepositoryStub implements GetAllRegistrationAgreementRepository {
		async getAll(): Promise<GetAllRegistrationAgreementRepositoryReturn>{
			return await Promise.resolve([mockRegistrationAgreementModel(), mockRegistrationAgreementModel()]);
		}
	}
	return new GetAllRegistrationAgreementRepositoryStub();
};