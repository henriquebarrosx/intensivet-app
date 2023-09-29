import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Camera as ExpoCamera } from "expo-camera"

import { DeviceFile } from "../../domain/entities/device-file"
import { logger } from "."

export class DeviceCameraAdapter {
    async requestAsyncPermission(): Promise<boolean> {
        await logger.info("CAMERA", "Get permission")
        const currentPermission = await ExpoCamera.getCameraPermissionsAsync()

        if (currentPermission.granted) return true

        await logger.info("CAMERA", "Request permission")
        const permissionResult = await ExpoCamera.requestCameraPermissionsAsync()
        return permissionResult.granted;
    }

    async takePicture(): Promise<DeviceFile | undefined> {
        const hasCameraPermission = await this.requestAsyncPermission()

        if (!hasCameraPermission) {
            Alert.alert("Permissão necessária", "Para realizar a captura e envio de fotos, é necessário acesso ao câmera do dispositivo")
            return
        }

        const pictureResult = await ImagePicker.launchCameraAsync({
            allowsMultipleSelection: false,
            allowsEditing: true,
            selectionLimit: 1,
            quality: 1,
        })

        if (pictureResult.canceled) return

        const { uri, fileName: name, type = "image" } = pictureResult.assets[0]
        return DeviceFile.create({ name, uri, type })
    }
}