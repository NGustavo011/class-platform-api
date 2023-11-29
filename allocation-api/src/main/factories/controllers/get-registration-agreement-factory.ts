import { Controller } from "../../../presentation/contracts/controller";
import { GetRegistrationAgreementController } from "../../../presentation/controllers/get-registration-agreement-controller/get-registration-agreement-controller";
import { makeGetRegistrationAgreement } from "../usecases/get-registration-agreement-factory";

export const makeGetRegistrationAgreementController = (): Controller => {
	const controller = new GetRegistrationAgreementController(makeGetRegistrationAgreement());
	return controller;
};