import { z } from 'zod';
import { CreateRegistrationAgreementContract } from '../../../domain/usecases-contracts/create-registration-agreement';
import { RabbitmqController } from '../../contracts/rabbitmq-controller';

const createRegistrationAgreementSchema = z.object({
	buyerId: z.string(),
	courseId: z.string(),
	orderId: z.string()
});

export class CreateRegistrationAgreementController extends RabbitmqController {
	constructor(
        private readonly createRegistrationAgreement: CreateRegistrationAgreementContract
	){
		super();
	}

	async handle(message: any): Promise<void> {
		const schemaResult = createRegistrationAgreementSchema.parse(message);
		const { 
			buyerId,
			courseId,
			orderId
		} = schemaResult;
		await this.createRegistrationAgreement.create({
			buyerId,
			courseId,
			orderId
		});
	}
}