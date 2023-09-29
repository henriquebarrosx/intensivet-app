import { logger } from "../../adapters"
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
            logger.info("VET CASES", "Find All", { endpoint })
            const response = await this.httpClient.get<FindAllVetCasesResponse>(endpoint)
            return [response.vet_cases, response.pagination]
        }

        catch (error) {
            logger.error("VET CASES", "Find All", { endpoint, cause: error })
            throw error
        }
    }

    async findOne(id: number): Promise<VetCaseDetails | undefined> {
        const endpoint = `/api/v2/vet_cases/${id}`

        try {
            logger.info("VET CASE", "Find by id", { endpoint })
            const response = await this.httpClient.get<VetCaseDetails>(endpoint)
            return response
        }

        catch (error) {
            logger.error("VET CASE", "Find by id", { endpoint, cause: error })
            throw error
        }
    }

    async readMessages(id: number): Promise<void> {
        const endpoint = `/vet_cases/${id}/unread_messages`

        try {
            logger.info("VET CASE MESSAGES", "Mark as read", { endpoint })
            await this.httpClient.get<void>(endpoint)
            return
        }

        catch (error) {
            logger.error("VET CASE MESSAGES", "Mark as read", { endpoint, cause: error })
            throw error
        }
    }
}