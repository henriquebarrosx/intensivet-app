import { API } from "../../axios";
import { AxiosResponse } from "axios";
import { OrderBy, VetCase } from "../../../schemas/VetCase";
import { PaginationType } from "../../../schemas/Pagination";

interface VetCaseMessageParams {
    page: number;
    orderBy: string;
}

interface Response {
    vet_cases: VetCase[];
    pagination: PaginationType;
}

export const fetchVetCases = (params: VetCaseMessageParams): Promise<AxiosResponse<Response>> => {
    const { page = 1, orderBy = OrderBy.LAST_MESSAGE } = params;
    return API.get(`/api/v2/vet_cases?page=${page}&with_status=in_progress&with_order=${orderBy}`);
}