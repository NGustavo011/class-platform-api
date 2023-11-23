import { InvalidParamError } from '../errors/invalid-param-error';
import { ServerError } from '../errors/server-error';
import { badRequest, serverError, unauthorized } from '../helpers/http/http-helper';
import { type HttpRequest, type HttpResponse } from './http';


export abstract class Controller {
	async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const output = await this.handle(httpRequest);
			return output;
		} catch (error) {
			console.log(error);
			if(error instanceof Error){
				if(error.message.includes('Required')){
					if(error.message.includes('authorization')){
						return unauthorized('Token não fornecido');
					}
					const invalidParams: string[] = [];
					for(const match of error.message.matchAll(/"path": \[\n[ ]*"(\S+)"/gm)){
						invalidParams.push(match[1]);
					}
					return badRequest(new InvalidParamError(invalidParams.join(', ')));
				}
			}
			console.log(error.message);
			return serverError(new ServerError());
		}
	}

  abstract handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
