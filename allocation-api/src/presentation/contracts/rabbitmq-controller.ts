import { Message } from '../../main/types/message'

export abstract class RabbitmqController {
	async execute (message: Message): Promise<void> {
		await this.handle(message);
	}

  abstract handle (message: Message): Promise<void>
}
