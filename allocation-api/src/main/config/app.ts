import express from 'express';
import cors from 'cors';
import { router } from '../routes';
import RabbitmqServer from '../rabbitmq-server';
import env from './env';
import { makeCreateRegistrationAgreementController } from '../factories/controllers/create-registration-agreement-factory';

export const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
initConsumeQueue();


async function initConsumeQueue() {
    const server = new RabbitmqServer(env.rabbitmqServer);
    await server.start();
    await server.consumeQueue(env.rabbitmqQueue, (message)=>{
        makeCreateRegistrationAgreementController().execute(message)
    });
}


