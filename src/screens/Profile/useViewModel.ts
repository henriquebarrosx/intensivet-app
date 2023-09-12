import { useState } from "react"
import { Alert } from "react-native"
import { useSession } from "../../context/UserContext"
import { disablePushNotification, enablePushNotification } from "../../utils/notification"

export const useViewModel = () => {
    const deviceSession = useSession()
    const [isNotificationsEnabled, setNotificationState] = useState(!!deviceSession.sessionData?.expoToken)

    const userThumbnail = deviceSession.sessionData?.current_account?.thumbnail

    async function removeCurrentSession(): Promise<void> {
        await deviceSession.clear()
    }

    async function handlePushNotification(isEnabled: boolean): Promise<void> {
        try {
            const expoToken = await (isEnabled ? enablePushNotification() : disablePushNotification())
            deviceSession.update({ expoToken: expoToken || "" })
        }

        catch {
            Alert.alert(
                'Sentimos muito',
                'Houve um problema ao configurar as notificações'
            )
        }
    }

    return {
        handlePushNotification,
        removeCurrentSession,
        setNotificationState,
        isNotificationsEnabled,
        userThumbnail,
    }
}