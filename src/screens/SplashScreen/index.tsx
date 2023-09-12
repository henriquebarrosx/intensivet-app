import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useSession } from "../../context/UserContext"

export default function SplashScreen() {
    const isFocused = useIsFocused()
    const { retrieve } = useSession()

    useEffect(() => {
        if (isFocused) retrieve()
    }, [isFocused])

    return null
}
