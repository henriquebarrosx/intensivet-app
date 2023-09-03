import { Fragment, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useSession } from "../../shared/react-hooks/useSession"
import { withGlobalProviders } from "../../shared/react-hooks/withGlobalProviders"
import { View } from "react-native"

export const SplashScreenHOC = withGlobalProviders(SplashScreen)

function SplashScreen() {
    const isFocused = useIsFocused()
    const session = useSession()

    useEffect(() => {
        (async () => {
            if (isFocused) await session.init()
        })()
    }, [isFocused])

    return <View />
}
