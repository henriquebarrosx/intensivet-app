import React, { useEffect } from "react"
import { WebView } from "react-native-webview"
import { useIsFocused } from "@react-navigation/native"
import { pushNotification } from "../../infra/adapters"

interface Props {
    route: { params: { source: string } }
}

const WebPage = ({ route }: Props) => {
    const { source } = route.params
    const isCurrentScreenFocused = useIsFocused()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            pushNotification.enableNotificationsLocally()
        }
    }, [isCurrentScreenFocused])

    return <WebView source={{ uri: source }} />
}

export default WebPage