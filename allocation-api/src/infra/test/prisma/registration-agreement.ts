import { mockRegistrationAgreementModel } from "../../../data/test/mock-registration-agreement";
import { prisma } from "../../../main/config/prisma";

export const mockPrismaRegistrationAgreement = async (): Promise<void> => {
    const registrationAgreementModel = mockRegistrationAgreementModel();
    await prisma.registrationAgreement.create({
        data: {
            id: "any_registration_agreement_id",
            buyerId: registrationAgreementModel.buyerId,
            courseId: registrationAgreementModel.courseId,
            orderId: registrationAgreementModel.orderId
        }
    })
}