import { GetConsumer } from "../../../data/usecases/get-consumer/get-consumer";
import { ConsumerPrismaRepository } from "../../../infra/db/prisma/consumer-prisma-repository";

export const makeGetConsumer = (): GetConsumer => {
	const getConsumerRepository = new ConsumerPrismaRepository();
	return new GetConsumer(getConsumerRepository);
};