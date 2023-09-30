import * as Device from "expo-device"
import { Platform } from "react-native"
import * as Notifications from "expo-notifications"

import { logger } from ".."

export class PushNotificationAdapter {
    async requestAsyncPermission(): Promise<boolean> {
        if (Device.isDevice) {
            logger.info("NOTIFICATION", "Get permission")
            const currentPermission = await Notifications.getPermissionsAsync()

            if (currentPermission.granted) return true

            logger.info("NOTIFICATION", "Request permission")
            const permission = await Notifications.requestPermissionsAsync()
            return permission.granted
        }

        return false
    }

    async generatePushToken(): Promise<string> {
        try {
            const hasNotificationPermission = await this.requestAsyncPermission()
            if (!hasNotificationPermission) return ""

            await this.setupAndroidNotifications()

            logger.info("NOTIFICATION", "Get expo push token")

            const { data } = await Notifications.getExpoPushTokenAsync({
                projectId: "369e150f-abfc-4e24-9ee5-88a2db8bd8a3",
            })

            return data
        }

        catch (error) {
            logger.error("NOTIFICATION", "Get expo push token", { cause: error?.message })
            throw error
        }
    }

    async setupAndroidNotifications(): Promise<void> {
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            })
        }
    }

    enableNotificationsLocally() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldSetBadge: false,
                shouldShowAlert: true,
                shouldPlaySound: true,
            })
        })
    }

    disableNotificationsLocally() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldSetBadge: false,
                shouldShowAlert: false,
                shouldPlaySound: false,
            })
        })
    }


}