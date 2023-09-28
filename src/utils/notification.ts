import Constants from "expo-constants"
import { Platform } from "react-native"
import * as Notifications from "expo-notifications"

import { SessionRepository } from "../infra/repositories/session"
import { httpClient } from "../infra/adapters/http-client-adapter"
import { NotificationService } from "../infra/services/notification-service"

export const addRequiredAndroidSettings = () => {
    Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
    })
}

export const getExpoPushNoficiationToken = async (): Promise<string | undefined> => {
    if (Constants.isDevice) {
        const deviceNotificationPermission = await Notifications.getPermissionsAsync()

        if (!deviceNotificationPermission.granted) {
            requestNotificationPermission()
        }

        return await generateExpoToken()
    }

    if (Platform.OS === "android") {
        addRequiredAndroidSettings()
    }

    return
}

const requestNotificationPermission = async () => {
    const notificationPermission = await Notifications.requestPermissionsAsync()

    if (notificationPermission.granted) {
        if (Platform.OS === "android") {
            addRequiredAndroidSettings()
        }

        return await generateExpoToken()
    }

    alert("Must use physical device for Push Notifications")
}

export const generateExpoToken = async (): Promise<string> => {
    return (await Notifications.getExpoPushTokenAsync({
        projectId: "369e150f-abfc-4e24-9ee5-88a2db8bd8a3"
    }))?.data
}

export async function enablePushNotification(): Promise<string> {
    const notificationService = new NotificationService(httpClient)
    const expoToken = await generateExpoToken()
    await notificationService.enable(expoToken)

    const sessionRepository = new SessionRepository()
    const userData = await sessionRepository.get()
    await sessionRepository.save({ ...userData, expoToken })

    return expoToken
}

export async function disablePushNotification(): Promise<void> {
    const notificationService = new NotificationService(httpClient)
    await notificationService.disable()

    const sessionRepository = new SessionRepository()
    const userData = await sessionRepository.get()
    await sessionRepository.save({ ...userData, expoToken: "" })
}