import { AddConsumerRepository } from "../../../data/repositories-contracts/add-consumer-repository";
import { GetConsumerRepository } from "../../../data/repositories-contracts/get-consumer-repository";
import { ConsumerModel } from "../../../domain/models/consumer";
import { AddConsumerParams } from "../../../domain/usecases-contracts/add-consumer";
import { GetConsumerParams } from "../../../domain/usecases-contracts/get-consumer";
import { prisma } from "../../../main/config/prisma";

export class ConsumerPrismaRepository implements AddConsumerRepository, GetConsumerRepository {
    
    async add(addConsumerParams: AddConsumerParams): Promise<ConsumerModel | null> {
        const { name, cpf } = addConsumerParams;
        const consumer = await prisma.consumer.create({
            data: {
                name,
                cpf
            }
        });
        return consumer;
    }
    
    async get(getConsumerParams: GetConsumerParams): Promise<ConsumerModel | null> {
        const { id } = getConsumerParams;
        const consumer = await prisma.consumer.findUnique({
            where: {
                id
            }
        });
        return consumer;
    }
}