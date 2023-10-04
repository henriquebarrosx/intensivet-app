import { useVetCasesContext } from "../../../../context/VetCasesContext"
import { useFileAttachmentModal } from "../../../../context/AttachModal"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"
import { MessageModelMapper } from "../../../../infra/mappers/message-model-mapper"
import { useVetCaseMessagesContext } from "../../../../context/VetCaseMessagesContext"

export function useViewModel() {
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()
    const fileAttachmentModalContext = useFileAttachmentModal()

    async function uploadAssetFromCamera() {
        const deviceCamera = new DeviceCameraAdapter()
        const deviceFile = await deviceCamera.takePicture()

        fileAttachmentModalContext.displayModal(false)

        if (!deviceFile) return

        const message = await vetCaseMessagesContext.sendFile(deviceFile)
        vetCasesContext.receiveMessage(MessageModelMapper.apply(message))
    }

    return { uploadAssetFromCamera }
}
