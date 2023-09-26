import { Message } from "../domain/entities/message"

export type MessageModel = {
    id: number
    vet_case_id: number
    message: string
    message_type: string
    file_name: string
    service_url: string
    video_thumbnail_url?: string
    account: {
        id: number
        doctor_name: string
    }
    is_admin: boolean
    is_sender: boolean
    created_at: string
}

export type MessageElement = React.MemoExoticComponent<({ message }: { message: Message }) => JSX.Element>

export interface MessageType {
    text: MessageElement
    file: MessageElement
    image: MessageElement
    video: MessageElement
    audio: MessageElement
}