import { CreateRegistrationAgreementContract, CreateRegistrationAgreementParams, CreateRegistrationAgreementReturn } from "../../../domain/usecases-contracts/create-registration-agreement";
import { CreateRegistrationAgreementRepository } from "../../repositories-contracts/create-registration-agreement-repository";

export class CreateRegistrationAgreement implements CreateRegistrationAgreementContract {
	constructor(
			private readonly createRegistrationAgreementRepository: CreateRegistrationAgreementRepository
		){
	}

	async create (createRegistrationAgreementParams: CreateRegistrationAgreementParams): Promise<CreateRegistrationAgreementReturn>{
		const registrationAgreement = await this.createRegistrationAgreementRepository.create(createRegistrationAgreementParams);
		return registrationAgreement;
	}
}