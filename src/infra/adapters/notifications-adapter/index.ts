import * as Notifications from "expo-notifications"
import { DeviceNotificationsGateway } from "./index.gateway"

export class NotificationsAdapter implements DeviceNotificationsGateway {
    async requestPermission(): Promise<boolean> {
        console.log("[ Permissions ] Requesting notifications permission")
        const permission = await Notifications.getPermissionsAsync()

        if (permission.granted) return true

        const requestedPermission = await Notifications.requestPermissionsAsync()

        if (requestedPermission.granted) {
            this.addAndroidSettings()
            return true
        }

        return false
    }

    async getDeviceToken(): Promise<string> {
        try {
            // Look for: https://expo.dev/accounts/[ACCOUNT_NAME]/projects/[PROJECT_NAME]
            const projectId = "369e150f-abfc-4e24-9ee5-88a2db8bd8a3"
            const { data: deviceToken } = await Notifications.getExpoPushTokenAsync({ projectId })
            return deviceToken
        }

        catch {
            return ""
        }
    }

    private addAndroidSettings(): void {
        Notifications.setNotificationChannelAsync('default', {
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            name: 'default',
        })
    }
}