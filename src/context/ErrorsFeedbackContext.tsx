import React, {
    Dispatch,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
    SetStateAction,
} from "react"

import { logger } from "../infra/adapters"
import { WithChildren } from "../@types/common"
import { useVetCaseIndicators } from "./VetCaseIndicators"

interface ErrorsFeedbackContextType {
    /** STATES */
    isErro500Visible: boolean
    isErrorModalVisible: boolean
    isNoConnectionVisible: boolean
    /** SET STATES */
    makeError500Visible: Dispatch<SetStateAction<boolean>>
    makeErrorModalVisible: Dispatch<SetStateAction<boolean>>
    makeNoConnectionVisible: Dispatch<SetStateAction<boolean>>
    closeUnexpectedErrorModal: ({ toRefresh }: { toRefresh: boolean }) => void
}

export const ErrorsFeedbackContext = createContext({} as ErrorsFeedbackContextType)

export const ErrorsFeedbackProvider = ({ children }: WithChildren) => {
    const [isErro500Visible, makeError500Visible] = useState(false)
    const [isErrorModalVisible, makeErrorModalVisible] = useState(false)
    const [isNoConnectionVisible, makeNoConnectionVisible] = useState(false)
    const { makeRefreshVetCaseList, makeTryAgainButtonVisible } = useVetCaseIndicators()

    const closeUnexpectedErrorModal = useCallback(({ toRefresh }: { toRefresh: boolean }) => {
        makeError500Visible(false)
        makeErrorModalVisible(false)
        makeNoConnectionVisible(false)
        makeRefreshVetCaseList(toRefresh)
    }, [])

    useEffect(() => {
        return () => {
            makeError500Visible(false)
            makeErrorModalVisible(false)
            makeRefreshVetCaseList(false)
            makeNoConnectionVisible(false)
            makeTryAgainButtonVisible(false)
        }
    }, [])

    return (
        <ErrorsFeedbackContext.Provider
            value={{
                isErro500Visible,
                isErrorModalVisible,
                makeError500Visible,
                isNoConnectionVisible,
                makeErrorModalVisible,
                makeNoConnectionVisible,
                closeUnexpectedErrorModal,
            }}
        >
            {children}
        </ErrorsFeedbackContext.Provider>
    )
}

export const useErrorsFeedback = (): ErrorsFeedbackContextType => {
    const context = useContext(ErrorsFeedbackContext)

    if (context) {
        return context
    }

    const errorMessage = "useErrorsFeedback should be nested in ErrorsFeedbackProvider"
    logger.error("REACT CONTEXT PROVIDER", errorMessage)
    throw new Error(errorMessage)
}


