import { GetBuyer } from "../../../data/usecases/get-buyer/get-buyer";
import { AxiosAdapter } from "../../../infra/http-client/adapters/axios-adapter";
import { BuyerHttpClient } from "../../../infra/http-client/axios/buyer/buyer-http-client";

export const makeGetBuyer = (): GetBuyer => {
	const buyerHttpClient = new BuyerHttpClient(new AxiosAdapter());
	return new GetBuyer(buyerHttpClient);
};