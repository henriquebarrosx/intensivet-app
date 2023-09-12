import * as ExpoDocumentPicker from "expo-document-picker"

import { DeviceFile } from "./DeviceFile"

export class DocumentPicker {
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