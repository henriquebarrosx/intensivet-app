import { useContext } from "react"

import { Message } from "../../../../schemas/Message"
import { Gallery } from "../../../../Entities/Gallery"
import { ChatContext } from "../../../../context/ChatContext"
import { UserContext } from "../../../../context/UserContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { sendFileMessage } from "../../../../services/network/chat"
import { removeDuplicatedKeysFromMessage } from "../../../../utils/message"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"

export const useViewModel = () => {
    const { updateVetCaseList } = useVetCases()
    const { userData } = useContext(UserContext)
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)
    const { setMessages, virtualizedListRef, displaySendFeedback } = useContext(ChatContext)

    async function uploadGalleryAssetMedia() {
        const gallery = new Gallery()
        const assetFile = await gallery.pickAsset()
        const accessToken = userData?.current_account?.access_token

        displayModal(false)

        try {
            if (assetFile) {
                displaySendFeedback(true)

                const response = await sendFileMessage({
                    vetCaseId,
                    accessToken,
                    file: assetFile,
                    onDownloadProgress: () => displaySendFeedback(false),
                })

                setMessages((prevMessages: Message[]) =>
                    removeDuplicatedKeysFromMessage([response, ...prevMessages])
                )

                updateVetCaseList(response)
            }
        }

        catch (error) {
            console.error("Upload media from gallery fails", error)
        }

        finally {
            virtualizedListRef?.current?.scrollToIndex({ index: 0 })
            displaySendFeedback(false)
        }
    }

    return { uploadGalleryAssetMedia }
}
