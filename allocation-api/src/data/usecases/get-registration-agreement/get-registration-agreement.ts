import { GetRegistrationAgreementContract, GetRegistrationAgreementParams, GetRegistrationAgreementReturn } from '../../../domain/usecases-contracts/get-registration-agreement';
import { GetAllRegistrationAgreementRepository } from '../../repositories-contracts/get-all-registration-agreement-repository';
import { GetRegistrationAgreementRepository } from '../../repositories-contracts/get-registration-agreement-repository';


export class GetRegistrationAgreement implements GetRegistrationAgreementContract {
	constructor(
			private readonly getRegistrationAgreementRepository: GetRegistrationAgreementRepository,
			private readonly getAllRegistrationAgreementRepository: GetAllRegistrationAgreementRepository
		){
	}

	async get (getRegistrationAgreementParams: GetRegistrationAgreementParams): Promise<GetRegistrationAgreementReturn | null>{
		const id = getRegistrationAgreementParams;
		if(!id){
			return await this.getAllRegistrationAgreementRepository.getAll()
		}
		const registrationAgreement = await this.getRegistrationAgreementRepository.get(id);
		return registrationAgreement?[registrationAgreement]:null
	}
}