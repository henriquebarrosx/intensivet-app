import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"

import { DeviceFile } from "../../domain/entities/device-file"
import { logger } from "./logger-adapter"

export class DeviceGalleryAdapter {
    async requestAsyncPermission(): Promise<boolean> {
        logger.info("GALLERY", "Get permission")
        const currentPermission = await MediaLibrary.getPermissionsAsync()

        if (currentPermission.granted) return true

        logger.info("GALLERY", "Request permission")
        const permissionResult = await MediaLibrary.requestPermissionsAsync()
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

        const { fileName: name, uri, type } = result.assets[0]
        return DeviceFile.create({ name, uri, type })
    }
}