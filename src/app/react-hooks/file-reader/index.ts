import { Platform } from "react-native"
import * as FileSystem from "expo-file-system"
import * as IntentLauncher from "expo-intent-launcher"
import { useNavigation } from "@react-navigation/native"

import { logger } from "../../../infra/adapters/logger-adapter"

export function useFileReader(): IFileReader {
    const navigation = useNavigation()

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

            navigation.navigate(
                "WebPage",
                { source: remoteURL, screenTitle: fileName }
            )
        }

        catch (error) {
            navigation.navigate(
                "WebPage",
                { source: remoteURL, screenTitle: fileName }
            )

            logger.error(
                "File Reader",
                "Something wrong when reading media",
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