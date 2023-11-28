import { RegistrationAgreementModel } from "../../domain/models/registration-agreement"

export type GetRegistrationAgreementRepositoryParams = string
export type GetRegistrationAgreementRepositoryReturn = RegistrationAgreementModel | null

export interface GetRegistrationAgreementRepository {
  get: (getRegistrationAgreementParams: GetRegistrationAgreementRepositoryParams) => Promise<GetRegistrationAgreementRepositoryReturn>
}
