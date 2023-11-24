import { mockBuyerModel } from "../../data/test/mock-buyer";
import { GetBuyerContract, GetBuyerReturn } from "../../domain/usecases-contracts/get-buyer";

export const mockGetBuyer = (): GetBuyerContract => {
	class GetBuyerStub implements GetBuyerContract {
		async get (): Promise<GetBuyerReturn> {
			return await Promise.resolve(mockBuyerModel());
		}
	}
	return new GetBuyerStub();
};