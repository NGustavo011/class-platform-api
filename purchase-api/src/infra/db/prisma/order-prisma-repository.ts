import { CreateOrderRepository, CreateOrderRepositoryReturn } from "../../../data/repositories-contracts/create-order-repository";
import { CreateOrderParams } from "../../../domain/usecases-contracts/create-order";
import { prisma } from "../../../main/config/prisma";

export class OrderPrismaRepository implements CreateOrderRepository {
    async create(createOrderParams: CreateOrderParams): Promise<CreateOrderRepositoryReturn> {
        const { buyerId, courseId } = createOrderParams;
        const order = await prisma.order.create({
            data: {
                buyerId,
                courseId
            }
        });
        return order;
    }
}