import { CreateRegistrationAgreementParams, CreateRegistrationAgreementReturn } from '../../domain/usecases-contracts/create-registration-agreement';

export interface CreateRegistrationAgreementRepository {
  create: (createRegistrationAgreementParams: CreateRegistrationAgreementParams) => Promise<CreateRegistrationAgreementReturn>
}
