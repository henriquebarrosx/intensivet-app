import { MessageModel } from "../../../schemas/Message"
import { Pagination } from "../../../schemas/Pagination"
import { DeviceFile } from "../../../domain/entities/device-file"

export type FindAllMessagesResponse = {
    pagination: Pagination;
    vet_case_messages: MessageModel[]
}

export type CreateMessagesParams = {
    message?: string
    file?: DeviceFile
}

export type CreateMessagesRequest = {
    vet_case_message: {
        message?: string
        vet_case_id: number
        message_type: "text" | "image" | "audio" | "file" | "video"
        file: {
            name: string
            type: string
            uri: string
        }
    }
}