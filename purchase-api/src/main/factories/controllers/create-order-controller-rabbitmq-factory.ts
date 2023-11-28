import { Controller } from "../../../presentation/contracts/controller";
import { CreateOrderController } from "../../../presentation/controllers/create-order/create-order-controller";
import env from "../../config/env";
import RabbitmqServer from "../../rabbitmq-server";
import { makeCreateOrder } from "../usecases/create-order-factory";
import { makeGetBuyer } from "../usecases/get-buyer-factory";
import { makeGetCourse } from "../usecases/get-course-factory";

export const makeCreateOrderControllerRabbitmq = (): Controller => {
    const rabbitmqServer = new RabbitmqServer(env.rabbitmqServer);
    const rabbitmqPublishQueue = env.rabbitmqQueue;
	const controller = new CreateOrderController(makeGetBuyer(), makeGetCourse(), makeCreateOrder(), rabbitmqServer, rabbitmqPublishQueue);
	return controller;
};