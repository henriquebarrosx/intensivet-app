import * as FileSystem from "expo-file-system"
import { Linking, Platform } from "react-native"
import * as IntentLauncher from "expo-intent-launcher"

import { logger } from "../../../infra/adapters/logger-adapter"

export function useFileReader(): IFileReader {
    async function read(fileName: string, remoteURL: string) {
        const localURL = FileSystem.documentDirectory + fileName
        const { uri } = await FileSystem.downloadAsync(remoteURL, localURL)

        try {
            if (Platform.OS === "android") {
                const contentURI = await FileSystem.getContentUriAsync(uri)

                await IntentLauncher.startActivityAsync(
                    "android.intent.action.VIEW",
                    { data: contentURI, flags: 1 }
                )

                return
            }

            const canOpen = await Linking.canOpenURL(uri)
            return canOpen ? await Linking.openURL(uri) : undefined
        }

        catch (error) {
            logger.error(
                "VIDEO PLAYER",
                "Something wrong when playing vídeo",
                { cause: error }
            )
        }
    }

    return {
        read,
    }
}

type IFileReader = {
    read(fileName: string, remoteURL: string): Promise<void>
}