import { useContext } from "react"
import { useVetCasesContext } from "../../../../context/VetCasesContext"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { MessageModelMapper } from "../../../../infra/mappers/message-model-mapper"
import { useVetCaseMessagesContext } from "../../../../context/VetCaseMessagesContext"
import { DeviceDocumentPickerAdapter } from "../../../../infra/adapters/device-document-picker"

export const useViewModel = () => {
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadDocumentFile() {
        const documentPicker = new DeviceDocumentPickerAdapter()
        const deviceFile = await documentPicker.pick()

        displayModal(false)

        if (!deviceFile) return

        const message = await vetCaseMessagesContext.sendFile(deviceFile)
        vetCasesContext.receiveMessage(MessageModelMapper.apply(message))
    }

    return { uploadDocumentFile }
}
