import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT ?? 3335,
	databaseUrl: process.env.DATABASE_URL ?? "postgresql://ouser:opassword@localhost:5434/order?schema=public",
	buyerApiUrl: process.env.BUYER_API_URL ?? "http://localhost:3333/",
	courseApiUrl: process.env.COURSE_API_URL ?? "http://localhost:3334/"
};