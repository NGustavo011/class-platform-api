import { AddConsumer } from "../../../data/usecases/add-consumer/add-consumer";
import { ConsumerPrismaRepository } from "../../../infra/db/prisma/consumer-prisma-repository";

export const makeAddConsumer = (): AddConsumer => {
	const addConsumerRepository = new ConsumerPrismaRepository();
	return new AddConsumer(addConsumerRepository);
};