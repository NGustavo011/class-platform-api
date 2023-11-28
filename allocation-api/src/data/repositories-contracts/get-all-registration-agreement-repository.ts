import { RegistrationAgreementModel } from "../../domain/models/registration-agreement"

export type GetAllRegistrationAgreementRepositoryReturn = RegistrationAgreementModel[]

export interface GetAllRegistrationAgreementRepository {
  getAll: () => Promise<GetAllRegistrationAgreementRepositoryReturn>
}
