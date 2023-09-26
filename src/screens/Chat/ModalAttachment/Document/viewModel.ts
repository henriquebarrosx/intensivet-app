import { useContext } from "react"
import { useChat } from "../../../../context/ChatContext"
import { UserContext } from "../../../../context/UserContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { sendFileMessage } from "../../../../services/network/chat"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { DeviceDocumentPickerAdapter } from "../../../../infra/adapters/device-document-picker"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const vetCasesViewModel = useVetCases()
    const { sessionData: userData } = useContext(UserContext)
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadDocumentFile() {
        const documentPicker = new DeviceDocumentPickerAdapter()
        const documentFile = await documentPicker.pick()
        const accessToken = userData?.current_account?.access_token

        displayModal(false)

        try {
            if (documentFile) {
                chatViewModel.displaySendFeedback(true)

                const response = await sendFileMessage({
                    vetCaseId,
                    accessToken,
                    file: documentFile,
                    onDownloadProgress: () => chatViewModel.displaySendFeedback(false),
                })

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
