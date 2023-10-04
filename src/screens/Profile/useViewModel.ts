import { useState } from "react"
import { useSession } from "../../context/UserContext"
import { useServices } from "../../context/ServicesContext"
import { useVetCasesContext } from "../../context/VetCasesContext"

export const useViewModel = () => {
    const deviceSession = useSession()
    const vetCasesContext = useVetCasesContext()
    const { notificationService } = useServices()
    const [isNotificationsEnabled, setNotificationState] = useState(!!deviceSession.sessionData?.expoToken)

    const userThumbnail = deviceSession.sessionData?.current_account?.thumbnail

    async function removeCurrentSession(): Promise<void> {
        vetCasesContext.reset()
        await deviceSession.clear()
    }

    async function handlePushNotification(isEnabled: boolean): Promise<void> {
        const pushNotificationToken = isEnabled
            ? await notificationService.enable()
            : await notificationService.disable()

        deviceSession.update({ expoToken: pushNotificationToken })
    }

    return {
        handlePushNotification,
        removeCurrentSession,
        setNotificationState,
        isNotificationsEnabled,
        userThumbnail,
    }
}