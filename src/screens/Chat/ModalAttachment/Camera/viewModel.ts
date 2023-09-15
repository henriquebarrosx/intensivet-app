import { useChat } from "../../../../context/ChatContext"
import { useSession } from "../../../../context/UserContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { sendFileMessage } from "../../../../services/network/chat"
import { useFileAttachmentModal } from "../../../../context/AttachModal"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const sessionContext = useSession()
    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCases()
    const fileAttachmentModalContext = useFileAttachmentModal()

    async function uploadAssetFromCamera() {
        const deviceCamera = new DeviceCameraAdapter()
        const assetFile = await deviceCamera.takePicture()
        const accessToken = sessionContext.sessionData?.current_account.access_token

        fileAttachmentModalContext.displayModal(false)

        if (!assetFile) return

        try {
            chatViewModel.displaySendFeedback(true)

            const response = await sendFileMessage({
                accessToken,
                file: assetFile,
                vetCaseId: vetCaseContext.vetCase.id,
                onDownloadProgress: () => chatViewModel.displaySendFeedback(false),
            })

            await chatViewModel.insertMessage(MessageMapper.map(response, true))
            vetCasesContext.updateVetCaseList(response)
        }

        catch (error) {
            console.error("[vet case messages] upload fails", error)
        }

        finally {
            chatViewModel.scrollToBottom()
            chatViewModel.displaySendFeedback(false)
        }
    }

    return { uploadAssetFromCamera }
}
