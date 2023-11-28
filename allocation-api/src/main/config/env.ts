import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3336,
	databaseUrl: process.env.DATABASE_URL ?? "postgresql://ouser:opassword@localhost:5435/allocation?schema=public",
};