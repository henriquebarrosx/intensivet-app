import { useMemo } from "react"
import { useNavigation } from "@react-navigation/native"
import { useVetCases } from "../../../context/VetCasesContext"
import { httpClient } from "../../../infra/adapters/http-client-adapter"
import { useVetCaseIndicators } from "../../../context/VetCaseIndicators"

export function useEmptyVetCaseList() {
    const { vetCases } = useVetCases()
    const navigation = useNavigation()
    const { isRefreshingVetCaseList } = useVetCaseIndicators()

    const isElementVisible = useMemo(() => {
        return !vetCases.length && !isRefreshingVetCaseList
    }, [vetCases.length, isRefreshingVetCaseList])

    function openIntensivetWebPlatformIntoWebView(): void {
        navigation.navigate("WebPage", {
            screenTitle: "Intensivet",
            source: `${httpClient.baseURL}/vet_cases/new`,
        })
    }

    return { isElementVisible, openIntensivetWebPlatformIntoWebView }
}