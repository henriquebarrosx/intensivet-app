import * as ImagePicker from "expo-image-picker"
import { Camera as ExpoCamera } from "expo-camera"

import { DeviceFile } from "./DeviceFile"
import { Alert } from "react-native"

export class Camera {
    private async requestAsyncPermission(): Promise<boolean> {
        console.log("[Camera] Retrieving permission...")
        const currentPermission = await ExpoCamera.getCameraPermissionsAsync()

        if (currentPermission.granted) return true

        console.log("[Camera] Requesting permission...")
        const permissionResult = await ExpoCamera.requestCameraPermissionsAsync()
        return permissionResult.granted;
    }

    async takePicture(): Promise<DeviceFile | undefined> {
        const hasCameraPermission = await this.requestAsyncPermission()

        if (!hasCameraPermission) {
            Alert.alert("Permissão necessária", "Para realizar a captura e envio de fotos, é necessário acesso ao câmera do dispositivo")
            console.log("Camera permission denied.")
            return
        }

        const pictureResult = await ImagePicker.launchCameraAsync()

        if (pictureResult.canceled) return

        const { fileName, uri, type } = pictureResult.assets[0]
        return DeviceFile.create(fileName, type, uri);
    }
}