import { MessageModel } from "../../../schemas/Message"
import { Pagination } from "../../../schemas/Pagination"
import { FindAllMessagesResponse } from "./index.models"
import { Message } from "../../../domain/entities/message"
import { MessageMapper } from "../../mappers/message-mapper"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class MessageService {
    constructor(private readonly httpClient: IHttpClient) { }

    async findAllByVetCase(vetCaseId: number, page: number = 1): Promise<[Message[], Pagination]> {
        const response = await this.httpClient.get<FindAllMessagesResponse>(
            `/api/v2/vet_cases/${vetCaseId}/vet_case_messages?page=${page}`
        )

        const messages = response.vet_case_messages.map((messageData) => MessageMapper.map(messageData, true))
        return [messages, response.pagination]
    }

    async findOneByVetCase(vetCaseId: number, messageId: number): Promise<Message> {
        const messageData = await this.httpClient.get<MessageModel>(
            `/api/v2/vet_cases/${vetCaseId}/vet_case_messages/${messageId}`
        )

        return MessageMapper.map(messageData, true)
    }
}