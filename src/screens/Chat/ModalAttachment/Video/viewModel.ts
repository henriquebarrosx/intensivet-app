import { useContext } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useChat } from "../../../../context/ChatContext"
import { UserContext } from "../../../../context/UserContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { sendFileMessage } from "../../../../services/network/chat"
import { DeviceFile } from "../../../../domain/entities/device-file"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { AudioRecordAdapter } from "../../../../infra/adapters/audio-record"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"

export const useViewModel = () => {
    const chatContext = useChat()
    const navigation = useNavigation()
    const { updateVetCaseList } = useVetCases()
    const { sessionData: userData } = useContext(UserContext)
    const { id: vetCaseId } = useVetCase().vetCase
    const { displayModal } = useContext(FileAttachmentModalContext)

    const recordVideo = async (): Promise<void> => {
        const camera = new DeviceCameraAdapter()
        const gallery = new DeviceGalleryAdapter()
        const microphone = new AudioRecordAdapter()

        const hasCameraPermission = await camera.requestAsyncPermission()
        const hasMicrophonePermission = await microphone.requestAsyncPermission()
        const hasMediaLibraryPermission = await gallery.requestAsyncPermission()

        if (hasCameraPermission && hasMicrophonePermission && hasMediaLibraryPermission) {
            displayModal(false)
            navigation.navigate('VideoCamera')
            return
        }

        Alert.alert(
            'Permissão negada!',
            'Para que seja possível gravar vídeos é necessário permitir o acesso a câmera, microfone e mídia do dispositivo'
        )
    }

    const handleRecordedVideo = async (uri: string) => {
        const accessToken = userData?.current_account?.access_token
        chatContext.displaySendFeedback(true)

        try {
            const deviceFile = DeviceFile.create({ uri, type: "video" })

            const response = await sendFileMessage({
                vetCaseId,
                accessToken,
                file: deviceFile,
                onDownloadProgress: () => chatContext.displaySendFeedback(false),
            })

            chatContext.insertMessage(MessageMapper.map(response, true))
            /* Remove route params to avoid any unexpected side effect */
            navigation.setParams({ videoUri: '' })
            chatContext.scrollToBottom()
            updateVetCaseList(response)
        }

        catch (error) {
            console.error(error)
            console.error('There was an error after tries to upload a image from gallery')
        }

        finally {
            chatContext.displaySendFeedback(false)
        }
    }

    return { recordVideo, handleRecordedVideo }
}