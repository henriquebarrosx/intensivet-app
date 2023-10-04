import { useContext } from "react"

import { useVetCasesContext } from "../../../../context/VetCasesContext"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"
import { MessageModelMapper } from "../../../../infra/mappers/message-model-mapper"
import { useVetCaseMessagesContext } from "../../../../context/VetCaseMessagesContext"

export const useViewModel = () => {
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadGalleryAssetMedia() {
        const gallery = new DeviceGalleryAdapter()
        const deviceFile = await gallery.pickAsset()

        displayModal(false)

        if (!deviceFile) return

        const message = await vetCaseMessagesContext.sendFile(deviceFile)
        vetCasesContext.receiveMessage(MessageModelMapper.apply(message), true)
    }

    return { uploadGalleryAssetMedia }
}
