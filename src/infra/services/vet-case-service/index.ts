import { Pagination } from "../../../@types/common"
import { FindAllVetCasesResponse } from "./index.models"
import { VetCaseModel, VetCaseOrderTypeEnum } from "../../../schemas/VetCase"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class VetCaseService {
    constructor(private readonly httpClient: IHttpClient) { }

    async findAll(page: number = 1, orderBy: VetCaseOrderTypeEnum): Promise<[VetCaseModel[], Pagination]> {
        const response = await this.httpClient.get<FindAllVetCasesResponse>(
            `/api/v2/vet_cases?page=${page}&with_status=in_progress&with_order=${orderBy}`
        )

        return [response.vet_cases, response.pagination]
    }

    async readMessages(vetCaseId: number): Promise<void> {
        await this.httpClient.get<FindAllVetCasesResponse>(
            `/vet_cases/${vetCaseId}/unread_messages`
        )
    }
}