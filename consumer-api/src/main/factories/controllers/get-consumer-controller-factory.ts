import { Controller } from "../../../presentation/contracts/controller";
import { GetConsumerController } from "../../../presentation/controllers/get-consumer/get-consumer-controller";
import { makeGetConsumer } from "../usecases/get-consumer-factory";

export const makeGetConsumerController = (): Controller => {
	const controller = new GetConsumerController(makeGetConsumer());
	return controller;
};