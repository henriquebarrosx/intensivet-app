import { Audio } from "expo-av"
import { Alert } from "react-native"
import { DeviceFile } from "../../domain/entities/device-file"
import { logger } from "./logger-adapter"

export class AudioRecordAdapter {
    data: Audio.Recording

    /**
     * Requests asynchronous permission for microphone access.
     *
     * @returns {Promise<boolean>} A promise that resolves to `true` if permission is granted, `false` otherwise.
     */
    async requestAsyncPermission(): Promise<boolean> {
        logger.info("MICROPHONE", "Get permission")
        const currentPermission = await Audio.getPermissionsAsync()

        if (currentPermission.granted) return true

        logger.info("MICROPHONE", "Request permission")
        const permissionResult = await Audio.requestPermissionsAsync()
        return permissionResult.granted;
    }

    /**
     * Starts recording audio.
     *
     * @returns {Promise<Audio.Recording>} A promise that resolves to the started audio recording.
     */
    async start(): Promise<Audio.Recording> {
        const hasGalleryAccessPermission = await this.requestAsyncPermission()

        if (!hasGalleryAccessPermission) {
            Alert.alert("Permissão necessária", "Para realizar a gravação e envio de áudios, é necessário acesso ao microfone do dispositivo")
            return
        }

        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        this.data = recording
        return recording
    }

    /**
     * Stops the audio recording.
     *
     * @returns {Promise<DeviceFile>} A promise that resolves to a DeviceFile containing the recorded audio.
     */
    async stop(): Promise<DeviceFile> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })

        const uri = this.data.getURI()
        return DeviceFile.create({ uri, type: "audio" })
    }

    /**
     * Cancels the audio recording.
     *
     * @returns {Promise<void>} A promise that resolves once the recording is canceled.
     */
    async cancel(): Promise<void> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    }
}