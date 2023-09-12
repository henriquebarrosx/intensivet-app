import { Camera } from "../../../../Entities/Camera";
import { Message } from '../../../../schemas/Message';
import { useChat } from '../../../../context/ChatContext';
import { useSession } from '../../../../context/UserContext';
import { useVetCase } from '../../../../context/VetCaseContext';
import { useVetCases } from '../../../../context/VetCasesContext';
import { sendFileMessage } from '../../../../services/network/chat';
import { useFileAttachmentModal } from '../../../../context/AttachModal';
import { removeDuplicatedKeysFromMessage } from '../../../../utils/message';

export const useViewModel = () => {
    const chatContext = useChat()
    const sessionContext = useSession()
    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCases()
    const fileAttachmentModalContext = useFileAttachmentModal()

    async function uploadAssetFromCamera() {
        const deviceCamera = new Camera()
        const assetFile = await deviceCamera.takePicture()
        const accessToken = sessionContext.userData?.current_account.access_token

        fileAttachmentModalContext.displayModal(false);

        if (!assetFile) return

        try {
            chatContext.displaySendFeedback(true)

            const response = await sendFileMessage({
                accessToken,
                file: assetFile,
                vetCaseId: vetCaseContext.vetCase.id,
                onDownloadProgress: () => chatContext.displaySendFeedback(false),
            })

            chatContext.setMessages((prevMessages: Message[]) =>
                removeDuplicatedKeysFromMessage([response, ...prevMessages])
            )

            vetCasesContext.updateVetCaseList(response)
        }

        catch (error) {
            console.error('Upload media from gallery fails', error);
        }

        finally {
            chatContext.virtualizedListRef?.current?.scrollToIndex({ index: 0 });
            chatContext.displaySendFeedback(false);
        }
    };

    return { uploadAssetFromCamera };
}
