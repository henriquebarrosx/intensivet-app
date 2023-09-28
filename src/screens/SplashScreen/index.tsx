import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { useSession } from "../../context/UserContext"

export default function SplashScreen() {
    const isFocused = useIsFocused()
    const sessionViewModel = useSession()

    useEffect(() => {
        if (isFocused) sessionViewModel.retrieve()
    }, [isFocused])

    return null
}
