import { MessageModel } from "../../schemas/Message"
import { Message } from "../../domain/entities/message"

export class MessageModelMapper {
    private constructor() { }

    static apply(message: Message): MessageModel {
        return {
            id: message.id,
            file_name: message?.attachment?.name,
            is_admin: message.isAdmin,
            is_sender: message.isSender,
            message: message.message,
            message_type: message.type,
            service_url: message?.attachment?.uri,
            vet_case_id: message.vetCaseId,
            video_thumbnail_url: message?.attachment?.preview,
            created_at: message.createdAt.toISOString(),
            account: {
                id: message.account.id,
                doctor_name: message.account.doctorName
            },
        }
    }
}