import { useContext } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { DeviceFile } from "../../../../domain/entities/device-file"
import { useVetCasesContext } from "../../../../context/VetCasesContext"
import { FileAttachmentModalContext } from "../../../../context/AttachModal"
import { AudioRecordAdapter } from "../../../../infra/adapters/audio-record"
import { DeviceCameraAdapter } from "../../../../infra/adapters/device-camera"
import { DeviceGalleryAdapter } from "../../../../infra/adapters/device-gallery"
import { MessageModelMapper } from "../../../../infra/mappers/message-model-mapper"
import { useVetCaseMessagesContext } from "../../../../context/VetCaseMessagesContext"

export const useViewModel = () => {
    const navigation = useNavigation()
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()
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

    async function handleRecordedVideo(uri: string): Promise<void> {
        const deviceFile = DeviceFile.create({ uri, type: "video" })

        if (!deviceFile) return

        const message = await vetCaseMessagesContext.sendFile(deviceFile)
        vetCasesContext.receiveMessage(MessageModelMapper.apply(message), true)
        navigation.setParams({ videoUri: '' })
    }

    return { recordVideo, handleRecordedVideo }
}