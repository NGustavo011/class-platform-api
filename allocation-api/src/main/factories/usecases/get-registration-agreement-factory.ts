import { GetRegistrationAgreement } from "../../../data/usecases/get-registration-agreement/get-registration-agreement";
import { RegistrationAgreementPrismaRepository } from "../../../infra/db/prisma/registration-agreement-prisma-repository";


export const makeGetRegistrationAgreement = (): GetRegistrationAgreement => {
	const registrationAgreementRepository = new RegistrationAgreementPrismaRepository();
	return new GetRegistrationAgreement(registrationAgreementRepository, registrationAgreementRepository);
};