import { MessageModel } from "../../schemas/Message"
import { Message } from "../../domain/entities/message"
import { Account } from "../../domain/entities/account"
import { DeviceFile } from "../../domain/entities/device-file"

export class MessageMapper {
    private constructor() { }

    static map(messageData: MessageModel, isSent: boolean) {
        const account = new Account()
            .withId(messageData.account.id)
            .withDoctorName(messageData.account.doctor_name)

        const message = new Message()
            .withId(messageData.id)
            .withVetCaseId(messageData.vet_case_id)
            .withAccount(account)
            .withMessage(messageData.message)
            .withType(messageData.message_type)
            .withCreatedAt(messageData.created_at)
            .withSenderFlag(messageData.is_sender)
            .withAdminFlag(messageData.is_admin)
            .withSentFlag(isSent)

        if (messageData.service_url && messageData.message_type) {
            if (messageData.message_type !== "text") {
                const file = DeviceFile.create({
                    uri: messageData.service_url,
                    name: messageData.file_name,
                    type: messageData.message_type as any,
                })

                message.withFile(file)
            }
        }

        return message
    }
}