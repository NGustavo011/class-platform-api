import { Controller } from "../../../presentation/contracts/controller";
import { AddConsumerController } from "../../../presentation/controllers/add-consumer/add-consumer-controller";
import { makeAddConsumer } from "../usecases/add-consumer-factory";

export const makeAddConsumerController = (): Controller => {
	const controller = new AddConsumerController(makeAddConsumer());
	return controller;
};