import { useChat } from "../../../../context/ChatContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { useServices } from "../../../../context/ServicesContext"
import { useFileAttachmentModal } from "../../../../context/AttachModal"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const vetCaseContext = useVetCase()
    const vetCasesViewModel = useVetCases()
    const { messageService } = useServices()
    const fileAttachmentModalContext = useFileAttachmentModal()

    async function uploadAssetFromCamera() {
        const deviceCamera = new DeviceCameraAdapter()
        const assetFile = await deviceCamera.takePicture()

        fileAttachmentModalContext.displayModal(false)

        if (!assetFile) return

        try {
            chatViewModel.displaySendFeedback(true)

            const response = await messageService.create(
                vetCaseContext.vetCase.id,
                { file: assetFile },
                () => chatViewModel.displaySendFeedback(false)
            )

            await chatViewModel.insertMessage(MessageMapper.apply(response))
            vetCasesViewModel.updateLastMessage(response, true)
        }

        finally {
            chatViewModel.scrollToBottom()
            chatViewModel.displaySendFeedback(false)
        }
    }

    return { uploadAssetFromCamera }
}
