import { CreateRegistrationAgreementRepository } from "../../../data/repositories-contracts/create-registration-agreement-repository";
import { GetAllRegistrationAgreementRepository, GetAllRegistrationAgreementRepositoryReturn } from "../../../data/repositories-contracts/get-all-registration-agreement-repository";
import { GetRegistrationAgreementRepository, GetRegistrationAgreementRepositoryParams, GetRegistrationAgreementRepositoryReturn } from "../../../data/repositories-contracts/get-registration-agreement-repository";
import { CreateRegistrationAgreementParams, CreateRegistrationAgreementReturn } from "../../../domain/usecases-contracts/create-registration-agreement";
import { prisma } from "../../../main/config/prisma";

export class RegistrationAgreementPrismaRepository implements CreateRegistrationAgreementRepository, GetRegistrationAgreementRepository, GetAllRegistrationAgreementRepository {
    async create(createRegistrationAgreementParams: CreateRegistrationAgreementParams): Promise<CreateRegistrationAgreementReturn> {
        const { buyerId, courseId, orderId } = createRegistrationAgreementParams;
        const registrationAgreement = await prisma.registrationAgreement.create({
            data: {
                buyerId,
                courseId,
                orderId
            }
        });
        return registrationAgreement;
    }

    async get(getRegistrationAgreementParams: GetRegistrationAgreementRepositoryParams): Promise<GetRegistrationAgreementRepositoryReturn> {
        const id = getRegistrationAgreementParams;
        const registrationAgreement = await prisma.registrationAgreement.findUnique({
            where: {
                id
            }
        });
        return registrationAgreement;
    }

    async getAll (): Promise<GetAllRegistrationAgreementRepositoryReturn>{
        const registrationsAgreement = await prisma.registrationAgreement.findMany();
        return registrationsAgreement;
    }
}