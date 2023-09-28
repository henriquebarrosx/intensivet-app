import { Pagination } from "../../../@types/common"
import { FindAllVetCasesResponse } from "./index.models"
import { VetCaseDetails } from "../../../schemas/VetCaseDetails"
import { VetCaseModel, VetCaseOrderTypeEnum } from "../../../schemas/VetCase"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class VetCaseService {
    constructor(private readonly httpClient: IHttpClient) { }

    async findAll(page: number = 1, orderBy: VetCaseOrderTypeEnum): Promise<[VetCaseModel[], Pagination]> {
        const endpoint = `/api/v2/vet_cases?page=${page}&with_status=in_progress&with_order=${orderBy}`

        try {
            console.log("[VET CASES] Get requested", { endpoint })
            const response = await this.httpClient.get<FindAllVetCasesResponse>(endpoint)
            return [response.vet_cases, response.pagination]
        }

        catch (error) {
            console.error("[VET CASES] Get requested", { endpoint }, { error })
            throw error
        }
    }

    async findOne(id: number): Promise<VetCaseDetails | undefined> {
        const endpoint = `/api/v2/vet_cases/${id}`

        try {
            console.log("[VET CASE] Get requested", { endpoint })
            const response = await this.httpClient.get<VetCaseDetails>(endpoint)
            return response
        }

        catch (error) {
            console.error("[VET CASE] Get requested", { endpoint }, { error })
            throw error
        }
    }

    async readMessages(id: number): Promise<void> {
        const endpoint = `/vet_cases/${id}/unread_messages`

        try {
            console.log("[VET CASE MESSAGES] Mark as read requested", { endpoint })
            const response = await this.httpClient.get<void>(endpoint)
            return
        }

        catch (error) {
            console.error("[VET CASE MESSAGES] Mark as read requested", { endpoint }, { error })
            throw error
        }
    }
}