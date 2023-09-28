import { useContext } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useChat } from "../../../../context/ChatContext"
import { useVetCase } from "../../../../context/VetCaseContext"
import { useVetCases } from "../../../../context/VetCasesContext"
import { DeviceFile } from "../../../../domain/entities/device-file"
import { MessageMapper } from "../../../../infra/mappers/message-mapper"
import { MessageService } from "../../../../infra/services/message-service"
import { httpClient } from "../../../../infra/adapters/http-client-adapter"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { AudioRecordAdapter } from "../../../../infra/adapters/audio-record"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"

export const useViewModel = () => {
    const chatContext = useChat()
    const navigation = useNavigation()
    const vetCasesViewModel = useVetCases()
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
        chatContext.displaySendFeedback(true)

        try {
            const deviceFile = DeviceFile.create({ uri, type: "video" })

            const messageService = new MessageService(httpClient)

            const response = await messageService.create(
                vetCaseId,
                { file: deviceFile },
                () => chatContext.displaySendFeedback(false)
            )

            chatContext.insertMessage(MessageMapper.apply(response))
            /* Remove route params to avoid any unexpected side effect */
            navigation.setParams({ videoUri: '' })
            vetCasesViewModel.updateLastMessage(response, true)
            chatContext.scrollToBottom()
        }

        finally {
            chatContext.displaySendFeedback(false)
        }
    }

    return { recordVideo, handleRecordedVideo }
}