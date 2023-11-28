import { RegistrationAgreementModel } from '../models/registration-agreement';

export type GetRegistrationAgreementParams = string | undefined
export type GetRegistrationAgreementReturn = RegistrationAgreementModel

export interface GetRegistrationAgreementContract {
    get: (getRegistrationAgreementParams: GetRegistrationAgreementParams) => Promise<GetRegistrationAgreementReturn>
}