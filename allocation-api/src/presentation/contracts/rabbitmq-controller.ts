export abstract class RabbitmqController {
	async execute (message: any): Promise<void> {
		await this.handle(message);
	}

  abstract handle (message: any): Promise<void>
}
