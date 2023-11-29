import { Controller } from "../../../presentation/contracts/controller";
import { RabbitmqController } from "../../../presentation/contracts/rabbitmq-controller";
import { CreateRegistrationAgreementController } from "../../../presentation/controllers/create-registration-agreement/create-registration-agreement-controller";
import { makeCreateRegistrationAgreement } from "../usecases/create-registration-agreement-factory";

export const makeCreateRegistrationAgreementController = (): RabbitmqController => {
	const controller = new CreateRegistrationAgreementController(makeCreateRegistrationAgreement());
	return controller;
};