import { RegistrationAgreementModel } from '../models/registration-agreement';

export type GetRegistrationAgreementParams = string | void
export type GetRegistrationAgreementReturn = RegistrationAgreementModel[]

export interface GetRegistrationAgreementContract {
    get: (getRegistrationAgreementParams: GetRegistrationAgreementParams) => Promise<GetRegistrationAgreementReturn | null>
}