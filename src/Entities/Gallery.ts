import * as ImagePicker from "expo-image-picker"
import { DeviceFile } from "./DeviceFile"
import { Alert } from "react-native"

export class Gallery {
    private async requestAsyncPermission(): Promise<boolean> {
        console.log("[Gallery] Retrieving permission...")
        const currentPermission = await ImagePicker.getMediaLibraryPermissionsAsync()

        if (currentPermission.granted) return true

        console.log("[Gallery] Requesting permission...")
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        return permissionResult.granted;
    }

    async pickAsset(): Promise<DeviceFile | undefined> {
        const hasGalleryAccessPermission = await this.requestAsyncPermission()

        if (!hasGalleryAccessPermission) {
            Alert.alert("Permissão necessária", "Para realizar o envio de fotos e/ou vídeos, é necessário acesso ao galeria do dispositivo")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            selectionLimit: 1,
            quality: 1,
        })

        if (result.canceled) return

        const { fileName, uri, type } = result.assets[0]
        return DeviceFile.create(fileName, type, uri);
    }
}