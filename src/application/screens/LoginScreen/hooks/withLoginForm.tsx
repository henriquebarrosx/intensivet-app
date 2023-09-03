import { ReactNode } from "react"
import { useNavigation } from "@react-navigation/native"

import { useLoginForm } from "./useLoginForm"
import { sessionService } from "../../../../infra/services"
import { useSession } from "../../../shared/react-hooks/useSession"
import { NotificationsAdapter } from "../../../../infra/adapters/notifications-adapter"

export function withLoginForm(Component: (props: any) => ReactNode) {
    const deviceNotifications = new NotificationsAdapter()

    return (props: any) => {
        const navigation = useNavigation()
        const sessionContext = useSession()

        const loginForm = useLoginForm(
            navigation,
            sessionContext,
            sessionService,
            deviceNotifications,
        )

        return <Component {...props} loginForm={loginForm} />
    }
}