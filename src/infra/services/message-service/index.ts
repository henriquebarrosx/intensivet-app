import { MessageModel } from "../../../schemas/Message"
import { Pagination } from "../../../schemas/Pagination"
import { Message } from "../../../domain/entities/message"
import { MessageMapper } from "../../mappers/message-mapper"
import { CreateMessagesParams, FindAllMessagesResponse } from "./index.models"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class MessageService {
    constructor(private readonly httpClient: IHttpClient) { }

    async findAllByVetCase(vetCaseId: number, page: number = 1): Promise<[Message[], Pagination]> {
        const response = await this.httpClient.get<FindAllMessagesResponse>(
            `/api/v2/vet_cases/${vetCaseId}/vet_case_messages?page=${page}`
        )

        const messages = response.vet_case_messages.map(MessageMapper.apply)
        return [messages, response.pagination]
    }

    async findOneByVetCase(vetCaseId: number, messageId: number): Promise<Message> {
        const messageData = await this.httpClient.get<MessageModel>(
            `/api/v2/vet_cases/${vetCaseId}/vet_case_messages/${messageId}`
        )

        return MessageMapper.apply(messageData)
    }

    async create(vetCaseId: number, content: CreateMessagesParams, onCompleteCb: Function = () => { }): Promise<MessageModel> {
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
            `/api/v2/vet_cases/${vetCaseId}/vet_case_messages`,
            formData,
            {
                onDownloadProgress: () => onCompleteCb(),
                headers: { "Content-Type": "multipart/form-data" },
            }
        )

        return response
    }
}