import * as ExpoDocumentPicker from "expo-document-picker"
import { DeviceFile } from "../../domain/entities/device-file"

export class DeviceDocumentPickerAdapter {
    /**
     * Picks a document from the device's storage.
     *
     * @returns {Promise<DeviceFile | undefined>} A promise that resolves to a DeviceFile containing the picked document,
     * or `undefined` if the operation was canceled.
     */
    async pick(): Promise<DeviceFile | undefined> {
        const documentResult = await ExpoDocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            type: "application/*",
            multiple: false,
        })

        if (documentResult.canceled) return

        const { name, uri, mimeType } = documentResult.assets[0]
        return DeviceFile.create({ name, uri, mimeType, type: "file" })
    }
}