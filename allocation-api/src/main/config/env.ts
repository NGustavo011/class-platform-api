import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3336,
	databaseUrl: process.env.DATABASE_URL ?? "postgresql://ouser:opassword@localhost:5435/allocation?schema=public",
	rabbitmqServer: process.env.RABBITMQ_SERVER ?? "amqp://admin:admin@localhost:5672",
	rabbitmqQueue: process.env.RABBITMQ_QUEUE ?? "allocation_course"
};