import { CreateOrder } from "../../../data/usecases/create-order/create-order";
import { OrderPrismaRepository } from "../../../infra/db/prisma/order-prisma-repository";

export const makeCreateOrder = (): CreateOrder => {
	const createOrderRepository = new OrderPrismaRepository();
	return new CreateOrder(createOrderRepository);
};