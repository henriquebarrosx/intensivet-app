import * as ExpoDocumentPicker from "expo-document-picker"

import { DeviceFile } from "./DeviceFile"

export class DocumentPicker {
    async pick(): Promise<DeviceFile | undefined> {
        const documentResult = await ExpoDocumentPicker.getDocumentAsync()

        if (documentResult.canceled) return

        const { name, uri } = documentResult.assets[0]
        return DeviceFile.create(name, "file", uri);
    }
}