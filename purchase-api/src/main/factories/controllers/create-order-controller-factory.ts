import { Controller } from "../../../presentation/contracts/controller";
import { CreateOrderController } from "../../../presentation/controllers/create-order/create-order-controller";
import { makeCreateOrder } from "../usecases/create-order-factory";
import { makeGetBuyer } from "../usecases/get-buyer-factory";
import { makeGetCourse } from "../usecases/get-course-factory";

export const makeCreateOrderController = (): Controller => {
	const controller = new CreateOrderController(makeGetBuyer(), makeGetCourse(), makeCreateOrder());
	return controller;
};