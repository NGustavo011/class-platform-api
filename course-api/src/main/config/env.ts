import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3334,
	databaseUrl: process.env.DATABASE_URL ?? "postgresql://couser:copassword@localhost:5433/course?schema=public",
};