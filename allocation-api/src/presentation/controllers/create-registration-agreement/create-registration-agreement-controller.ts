import { z } from 'zod';
import { CreateRegistrationAgreementContract } from '../../../domain/usecases-contracts/create-registration-agreement';
import { RabbitmqController } from '../../contracts/rabbitmq-controller';
import { Message } from 'amqplib';

const createRegistrationAgreementSchema = z.object({
	buyerId: z.string(),
	courseId: z.string(),
	id: z.string()
});

export class CreateRegistrationAgreementController extends RabbitmqController {
	constructor(
        private readonly createRegistrationAgreement: CreateRegistrationAgreementContract
	){
		super();
	}

	async handle(message: Message): Promise<void> {
		const messageObject = JSON.parse(message.content.toString());
		const schemaResult = createRegistrationAgreementSchema.parse(messageObject);
		const { 
			buyerId,
			courseId,
			id
		} = schemaResult;
		await this.createRegistrationAgreement.create({
			buyerId,
			courseId,
			orderId: id
		});
	}
}