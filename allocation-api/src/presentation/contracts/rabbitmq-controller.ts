import { Message } from "amqplib";

export abstract class RabbitmqController {
	async execute (message: Message): Promise<void> {
		await this.handle(message);
	}

  abstract handle (message: Message): Promise<void>
}
