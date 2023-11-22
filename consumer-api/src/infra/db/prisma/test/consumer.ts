import { mockConsumerModel } from "../../../../data/test/mock-consumer"
import { prisma } from "../../../../main/config/prisma";

export const mockPrismaConsumer = async (): Promise<void> => {
    const consumerModel = mockConsumerModel();
    await prisma.consumer.create({
        data: {
            id: "consumer_id_1",
            name: consumerModel.name,
            cpf: consumerModel.cpf
        }
    })
}