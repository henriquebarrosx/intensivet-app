import { Audio } from "expo-av"
import { DeviceFile } from "./DeviceFile"
import { Alert } from "react-native"

export class AudioRecord {
    data: Audio.Recording

    async requestAsyncPermission(): Promise<boolean> {
        console.log("[Microphone] Retrieving permission...")
        const currentPermission = await Audio.getPermissionsAsync()

        if (currentPermission.granted) return true

        console.log("[Microphone] Requesting permission...")
        const permissionResult = await Audio.requestPermissionsAsync()
        return permissionResult.granted;
    }

    async start(): Promise<AudioRecord> {
        const hasGalleryAccessPermission = await this.requestAsyncPermission()

        if (!hasGalleryAccessPermission) {
            Alert.alert("Permissão necessária", "Para realizar a gravação e envio de áudios, é necessário acesso ao microfone do dispositivo")
            return
        }

        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        this.data = recording
        return this
    }

    async stop(): Promise<DeviceFile> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })

        const uri = this.data.getURI()
        return DeviceFile.create({ uri, type: "audio" })
    }

    async cancel(): Promise<void> {
        this.data.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    }
}