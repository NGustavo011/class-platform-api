import { z } from 'zod';
import { GetRegistrationAgreementContract } from '../../../domain/usecases-contracts/get-registration-agreement';
import { Controller } from '../../contracts/controller';
import { HttpRequest, HttpResponse } from '../../contracts/http';
import { badRequest, ok } from '../../helpers/http/http-helper';
import { InvalidParamError } from '../../errors/invalid-param-error';

const getRegistrationAgreementParams = z.object({
	id: z.string().optional()
});

export class GetRegistrationAgreementController extends Controller {
	constructor(
        private readonly getRegistrationAgreement: GetRegistrationAgreementContract
	){
		super();
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		const paramsResult = getRegistrationAgreementParams.parse(httpRequest.params);
		const { 
			id
		} = paramsResult;
		const registrationsAgreement = await this.getRegistrationAgreement.get(id);
        if(!registrationsAgreement)
            return badRequest(new InvalidParamError("id"));
        return ok(registrationsAgreement)
	}
}