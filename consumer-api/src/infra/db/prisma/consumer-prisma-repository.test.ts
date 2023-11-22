import { mockAddConsumerParams, mockConsumerModel } from "../../../data/test/mock-consumer";
import { AddConsumerReturn } from "../../../domain/usecases-contracts/add-consumer";
import { GetConsumerReturn } from "../../../domain/usecases-contracts/get-consumer";
import { prisma } from "../../../main/config/prisma";
import { ConsumerPrismaRepository } from "./consumer-prisma-repository";
import { clearDatabase } from "./test/clear-database";
import { mockPrismaConsumer } from "./test/consumer";

const makeSut = (): ConsumerPrismaRepository => {
	return new ConsumerPrismaRepository();
};

describe('ConsumerPrismaRepository', () => {
	beforeAll(async () => {
		await prisma.$connect();
	});
	afterAll(async () => {
		await prisma.$disconnect();
	});
	beforeEach(async () => {
		await clearDatabase();
	});

	describe('add()', () => {
		test('Deve retornar um consumidor em caso de sucesso no método de add', async () => {
			const sut = makeSut();
			const addConsumerParams = mockAddConsumerParams();
			const consumer = await sut.add(addConsumerParams) as AddConsumerReturn;
			expect(consumer).toBeTruthy();
			expect(consumer.id).toBeTruthy();
			expect(consumer.name).toBe(addConsumerParams.name);
			expect(consumer.cpf).toBe(addConsumerParams.cpf);
			const newConsumers = await prisma.consumer.findMany({});
			expect(newConsumers[0].id).toBe(consumer.id);
		});
	});

	describe('get()', ()=>{
		test('Deve retornar um único consumidor em caso de especificar o id', async () => {
			const sut = makeSut();
            const consumerModel = mockConsumerModel();
			await mockPrismaConsumer();
			const consumer = await sut.get({ id: 'consumer_id_1'}) as GetConsumerReturn;
			expect(consumer).toBeTruthy();
			expect(consumer.name).toBe(consumerModel.name);
			expect(consumer.cpf).toBe(consumerModel.cpf);
			expect(consumer.id).toBe('consumer_id_1');
		});
        test('Deve retornar null em caso de não encontrar o consumidor', async () => {
			const sut = makeSut();
			await mockPrismaConsumer();
			const consumers = await sut.get({ id: 'consumer_id_2'}) as GetConsumerReturn;
			expect(consumers).toBeNull();
		});
	});
});