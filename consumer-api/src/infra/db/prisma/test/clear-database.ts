import { prisma } from "../../../../main/config/prisma";

export const clearDatabase = async (): Promise<void> => {
	await prisma.consumer.deleteMany({});
};
