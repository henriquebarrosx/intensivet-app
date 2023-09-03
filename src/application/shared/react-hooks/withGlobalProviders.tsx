import React, { ReactNode } from "react"
import { useNavigation } from "@react-navigation/native"

import { SessionProvider } from "./useSession"
import { sessionRepository } from "../../../infra/repositories"

export function withGlobalProviders(Component: any) {
    return (props: any) => {
        const navigation = useNavigation()

        return (
            <SessionProvider
                sessionRepository={sessionRepository}
                navigation={navigation}
            >
                <Component {...props} />
            </SessionProvider>
        )
    }

}