import { logger } from "../../adapters"
import { MessageModel } from "../../../schemas/Message"
import { Pagination } from "../../../schemas/Pagination"
import { Message } from "../../../domain/entities/message"
import { MessageMapper } from "../../mappers/message-mapper"
import { CreateMessagesParams, FindAllMessagesResponse } from "./index.models"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class MessageService {
    constructor(private readonly httpClient: IHttpClient) { }

    async findAllByVetCase(vetCaseId: number, page: number = 1): Promise<[Message[], Pagination]> {
        const endpoint = `/api/v2/vet_cases/${vetCaseId}/vet_case_messages?page=${page}`

        try {
            await logger.info("VET CASE MESSAGES", "Find All by case id", { endpoint })
            const response = await this.httpClient.get<FindAllMessagesResponse>(endpoint)
            const messages = response.vet_case_messages.map(MessageMapper.apply)
            return [messages, response.pagination]
        }

        catch (error) {
            await logger.error("VET CASE MESSAGE", "Find All by case id", { endpoint, cause: error?.message })
            throw error
        }
    }

    async findOneByVetCase(vetCaseId: number, messageId: number): Promise<Message> {
        const endpoint = `/api/v2/vet_cases/${vetCaseId}/vet_case_messages/${messageId}`

        try {
            await logger.info("VET CASE MESSAGE", "Find by id", { endpoint })
            const messageData = await this.httpClient.get<MessageModel>(endpoint)
            return MessageMapper.apply(messageData)
        }

        catch (error) {
            await logger.error("VET CASE MESSAGE", "Find by id", { endpoint, cause: error?.message })
            throw error
        }
    }

    async create(vetCaseId: number, content: CreateMessagesParams, onCompleteCb: Function = () => { }): Promise<MessageModel> {
        const endpoint = `/api/v2/vet_cases/${vetCaseId}/vet_case_messages`

        try {
            await logger.info("VET CASE MESSAGE", "Create new message", { endpoint })
            const formData = new FormData()

            !!content.message
                ? formData.append('vet_case_message[message]', content.message)
                : formData.append('vet_case_message[file]', {
                    name: content.file.name,
                    type: content.file.type,
                    uri: content.file.uri,
                } as any)

            formData.append('vet_case_message[message_type]', content?.file?.kind || "text")
            formData.append('vet_case_message[vet_case_id]', vetCaseId as any)

            const response = await this.httpClient.post<FormData, MessageModel>(
                endpoint,
                formData,
                {
                    onDownloadProgress: () => onCompleteCb(),
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )

            return response
        }

        catch (error) {
            await logger.error("VET CASE MESSAGE", "Create new message", { endpoint, cause: error?.message })
            throw error
        }
    }
}