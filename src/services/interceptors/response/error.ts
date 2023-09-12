import { AxiosError } from "axios"
import NetInfo from "@react-native-community/netinfo"

import { navigationRef } from "../../../utils/navigation"
import { useSession } from "../../../context/UserContext"
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext"
import { useVetCaseIndicators } from "../../../context/VetCaseIndicators"

export function useRejectedResponseInterceptor() {
    const deviceSession = useSession()
    const { makeRefreshVetCaseList, makeTryAgainButtonVisible } = useVetCaseIndicators()
    const { makeError500Visible, makeErrorModalVisible, makeNoConnectionVisible } = useErrorsFeedback()

    async function onErrorResponse(error: AxiosError): Promise<never> {
        addMissingInternetConnectionHandler(error)
        addInternalServerErrorHandler(error)
        await addNotAuthorizedHandler(error)
        return Promise.reject(error)
    }

    async function addNotAuthorizedHandler(error: any): Promise<void> {
        const notAuthorized = error?.response?.status === 401

        const currentScreenName = navigationRef.current?.getCurrentRoute()?.name!
        const belongsToPublicScreen = ["Login"].includes(currentScreenName)

        if (notAuthorized && !belongsToPublicScreen) {
            console.error("[authorization] invalid access token")
            await deviceSession.clear()
            return Promise.reject(error)
        }
    }

    function addMissingInternetConnectionHandler(error: any): void {
        NetInfo.addEventListener(networkState => {
            if (networkState.isConnected) return

            makeErrorModalVisible(true)
            makeNoConnectionVisible(true)
            makeRefreshVetCaseList(false)
            makeTryAgainButtonVisible(true)
            return Promise.reject(error)
        })
    }

    function addInternalServerErrorHandler(error: any): Promise<void> {
        if (error?.response?.status === 500) {
            makeError500Visible(true)
            makeErrorModalVisible(true)
            makeRefreshVetCaseList(false)
            makeTryAgainButtonVisible(true)
            return Promise.reject(error)
        }
    }

    return { onErrorResponse }
}

