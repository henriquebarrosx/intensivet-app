import { API } from "../../axios"
import { Message } from "../../../schemas/Message"
import { formatFileMessage } from "../../../utils/message"
import { DeviceFile } from "../../../domain/entities/device-file"

interface SendFileMessage {
    file: DeviceFile
    vetCaseId: number
    onDownloadProgress: () => void
    accessToken: string | undefined
}

export const sendFileMessage = async (params: SendFileMessage): Promise<Message> => {
    const { vetCaseId, file, accessToken, onDownloadProgress } = params

    const promiseUrl = `/api/v2/vet_cases/${vetCaseId}/vet_case_messages`
    const bodyRequest = formatFileMessage(file, vetCaseId, file.kind)

    const { data } = await API.post(promiseUrl, bodyRequest, {
        onDownloadProgress: onDownloadProgress,
        transformRequest: () => bodyRequest,
        headers: { Authorization: accessToken!, 'Content-Type': 'multipart/form-data' },
    })

    return data
}

interface SendTextMessage {
    message: string
    vetCaseId: number
    accessToken: string | undefined
}

export const sendTextMessage = async (params: SendTextMessage): Promise<Message> => {
    const { vetCaseId, accessToken, message } = params

    const promiseUrl = `/api/v2/vet_cases/${vetCaseId}/vet_case_messages`

    const bodyRequest = {
        vet_case_message: {
            message,
            message_type: 'text',
            vet_case_id: vetCaseId,
        }
    }

    const { data } = await API.post(promiseUrl, bodyRequest, {
        headers: { Authorization: accessToken! },
    })

    return data
}