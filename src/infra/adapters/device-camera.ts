import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Camera as ExpoCamera } from "expo-camera"

import { DeviceFile } from "../../domain/entities/device-file"
import { logger } from "./logger-adapter"

export class DeviceCameraAdapter {

    /**
     * Requests asynchronous permission for camera access.
     *
     * @returns {Promise<boolean>} A promise that resolves to `true` if permission is granted, `false` otherwise.
     */
    async requestAsyncPermission(): Promise<boolean> {
        logger.info("CAMERA", "Get permission")
        const currentPermission = await ExpoCamera.getCameraPermissionsAsync()

        if (currentPermission.granted) return true

        logger.info("CAMERA", "Request permission")
        const permissionResult = await ExpoCamera.requestCameraPermissionsAsync()
        return permissionResult.granted;
    }

    /**
     * Takes a picture using the device's camera.
     *
     * @returns {Promise<DeviceFile | undefined>} A promise that resolves to a DeviceFile containing the captured image,
     * or `undefined` if the operation was canceled or permission was denied.
     */
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