import { mockCreateOrderParams, mockOrderModel } from "../../../data/test/mock-order";
import { prisma } from "../../../main/config/prisma";
import { OrderPrismaRepository } from "./order-prisma-repository";
import { clearDatabase } from "../../test/prisma/clear-database";
import { CreateOrderRepositoryReturn } from "../../../data/repositories-contracts/create-order-repository";

const makeSut = (): OrderPrismaRepository => {
	return new OrderPrismaRepository();
};

describe('OrderPrismaRepository', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});

	describe('create()', () => {
		test('Deve retornar um curso em caso de sucesso no método de create', async () => {
			const sut = makeSut();
			const createOrderParams = mockCreateOrderParams();
			const order = await sut.create(createOrderParams) as CreateOrderRepositoryReturn;
			expect(order).toBeTruthy();
			expect(order.id).toBeTruthy();
			expect(order.buyerId).toBe(createOrderParams.buyerId);
			expect(order.courseId).toBe(createOrderParams.courseId);
			const newOrders = await prisma.order.findMany({});
			expect(newOrders[0].id).toBe(order.id);
		});
	});
});