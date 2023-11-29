import { mockRegistrationAgreementModel } from "../../data/test/mock-registration-agreement";
import { CreateRegistrationAgreementContract, CreateRegistrationAgreementReturn } from "../../domain/usecases-contracts/create-registration-agreement";
import { GetRegistrationAgreementContract, GetRegistrationAgreementReturn } from "../../domain/usecases-contracts/get-registration-agreement";

export const mockCreateRegistrationAgreement = (): CreateRegistrationAgreementContract => {
	class CreateRegistrationAgreementStub implements CreateRegistrationAgreementContract {
		async create (): Promise<CreateRegistrationAgreementReturn> {
			return await Promise.resolve(mockRegistrationAgreementModel());
		}
	}
	return new CreateRegistrationAgreementStub();
};

export const mockGetRegistrationAgreement = (): GetRegistrationAgreementContract => {
	class GetRegistrationAgreementStub implements GetRegistrationAgreementContract {
		async get (): Promise<GetRegistrationAgreementReturn> {
			return await Promise.resolve([mockRegistrationAgreementModel()]);
		}
	}
	return new GetRegistrationAgreementStub();
};