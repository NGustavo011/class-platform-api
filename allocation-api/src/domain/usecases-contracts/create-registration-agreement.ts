import { RegistrationAgreementModel } from '../models/registration-agreement';

export type CreateRegistrationAgreementParams = Omit<RegistrationAgreementModel, 'id' | 'startDate' | 'endDate'>
export type CreateRegistrationAgreementReturn = RegistrationAgreementModel

export interface CreateRegistrationAgreementContract {
    create: (createRegistrationAgreementParams: CreateRegistrationAgreementParams) => Promise<CreateRegistrationAgreementReturn>
}