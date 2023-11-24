import { mockOrderModel } from "../../../data/test/mock-order";
import { prisma } from "../../../main/config/prisma";

export const mockPrismaOrder = async (): Promise<void> => {
    const orderModel = mockOrderModel();
    await prisma.order.create({
        data: {
            id: "order_id_1",
            buyerId: orderModel.buyerId,
            courseId: orderModel.courseId
        }
    })
}