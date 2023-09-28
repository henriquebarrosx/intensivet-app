import { useContext } from "react"
import { useChat } from "../../../../context/ChatContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { MessageService } from "../../../../infra/services/message-service"
import { httpClient } from "../../../../infra/adapters/http-client-adapter"
import { DeviceDocumentPickerAdapter } from "../../../../infra/adapters/device-document-picker"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const vetCasesViewModel = useVetCases()
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadDocumentFile() {
        const documentPicker = new DeviceDocumentPickerAdapter()
        const documentFile = await documentPicker.pick()

        displayModal(false)

        try {
            if (documentFile) {
                chatViewModel.displaySendFeedback(true)

                const messageService = new MessageService(httpClient)

                const response = await messageService.create(
                    vetCaseId,
                    { file: documentFile },
                    () => chatViewModel.displaySendFeedback(false)
                )

                await chatViewModel.insertMessage(MessageMapper.apply(response))
                vetCasesViewModel.updateLastMessage(response, true)
            }
        }

        catch (error) {
            console.error("Upload media from gallery fails", error)
        }

        finally {
            chatViewModel.displaySendFeedback(false)
            chatViewModel.scrollToBottom()
        }
    }

    return { uploadDocumentFile }
}
