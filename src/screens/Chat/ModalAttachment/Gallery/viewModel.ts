import { useContext } from "react"

import { MessageModel } from "../../../../schemas/Message"
import { ChatContext, useChat } from "../../../../context/ChatContext"
import { UserContext } from "../../../../context/UserContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { sendFileMessage } from "../../../../services/network/chat"
import { removeDuplicatedKeysFromMessage } from "../../../../utils/message"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const { updateVetCaseList } = useVetCases()
    const { sessionData: userData } = useContext(UserContext)
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)

    async function uploadGalleryAssetMedia() {
        const gallery = new DeviceGalleryAdapter()
        const assetFile = await gallery.pickAsset()
        const accessToken = userData?.current_account?.access_token

        displayModal(false)

        try {
            if (assetFile) {
                chatViewModel.displaySendFeedback(true)

                const response = await sendFileMessage({
                    vetCaseId,
                    accessToken,
                    file: assetFile,
                    onDownloadProgress: () => chatViewModel.displaySendFeedback(false),
                })

                await chatViewModel.insertMessage(MessageMapper.map(response, true))
                updateVetCaseList(response)
            }
        }

        catch (error) {
            console.error("Upload media from gallery fails", error)
        }

        finally {
            chatViewModel.scrollToBottom()
            chatViewModel.displaySendFeedback(false)
        }
    }

    return { uploadGalleryAssetMedia }
}
