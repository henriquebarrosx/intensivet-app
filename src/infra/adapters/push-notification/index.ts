import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

export class PushNotificationAdapter {
    async requestAsyncPermission(): Promise<boolean> {
        if (Device.isDevice) {
            console.log("[NOTIFICATION] Get permission")
            const currentPermission = await Notifications.getPermissionsAsync()

            if (currentPermission.granted) return true

            console.log("[NOTIFICATION] Permission requested")
            const permission = await Notifications.requestPermissionsAsync()
            return permission.granted
        }

        console.error(
            "[NOTIFICATION] Permission requested",
            { error: "Must use physical device for Push Notifications" }
        )

        return false
    }

    async generatePushToken(): Promise<string> {
        const hasNotificationPermission = await this.requestAsyncPermission()
        if (!hasNotificationPermission) return ""

        await this.setupAndroidNotifications()

        const { data } = await Notifications.getExpoPushTokenAsync({
            projectId: "369e150f-abfc-4e24-9ee5-88a2db8bd8a3",
        })

        return data
    }

    async setupAndroidNotifications(): Promise<void> {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        })
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