import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3333,
	databaseUrl: process.env.DATABASE_URL ?? 'postgresql://cuser:cpassword@localhost:5432/consumer?schema=public',
};