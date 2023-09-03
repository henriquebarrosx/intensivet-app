import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter"

export function withCustomFonts(Component: any) {
    return (props: any) => {
        const [isCustomFontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium, Inter_400Regular })
        return isCustomFontsLoaded ? <Component {...props} /> : null
    }
}