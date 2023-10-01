import { useContext } from "react"

import { useChat } from "../../../../context/ChatContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useServices } from "../../../../context/ServicesContext"
import { useVetCasesContext } from "../../../../context/VetCasesContext"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const { messageService } = useServices()
    const vetCasesContext = useVetCasesContext()
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadGalleryAssetMedia() {
        const gallery = new DeviceGalleryAdapter()
        const assetFile = await gallery.pickAsset()

        displayModal(false)

        try {
            if (assetFile) {
                chatViewModel.displaySendFeedback(true)

                const response = await messageService.create(
                    vetCaseId,
                    { file: assetFile },
                    () => chatViewModel.displaySendFeedback(false)
                )

                await chatViewModel.insertMessage(MessageMapper.apply(response))
                vetCasesContext.receiveMessage(response, true)
            }
        }

        finally {
            chatViewModel.scrollToBottom()
            chatViewModel.displaySendFeedback(false)
        }
    }

    return { uploadGalleryAssetMedia }
}
