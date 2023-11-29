import { CreateRegistrationAgreement } from "../../../data/usecases/create-registration-agreement/create-registration-agreement";
import { RegistrationAgreementPrismaRepository } from "../../../infra/db/prisma/registration-agreement-prisma-repository";

export const makeCreateRegistrationAgreement = (): CreateRegistrationAgreement => {
	const createRegistrationAgreementRepository = new RegistrationAgreementPrismaRepository();
	return new CreateRegistrationAgreement(createRegistrationAgreementRepository);
};