import { useNavigation } from "@react-navigation/native"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { httpClient } from "../../../infra/adapters/http-client-adapter"
import { useVetCaseIndicators } from "../../../context/VetCaseIndicators"

export function useEmptyVetCaseList() {
    const navigation = useNavigation()
    const vetCasesContext = useVetCasesContext()
    const { isRefreshingVetCaseList } = useVetCaseIndicators()

    const isElementVisible = !vetCasesContext.items.length && !isRefreshingVetCaseList

    function openIntensivetWebPlatformIntoWebView(): void {
        navigation.navigate("WebPage", {
            screenTitle: "Intensivet",
            source: `${httpClient.baseURL}/vet_cases/new`,
        })
    }

    return { isElementVisible, openIntensivetWebPlatformIntoWebView }
}