import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import { WithChildren } from "../@types/common"
import { logger } from "../infra/adapters"

interface ContextSchema {
    /** STATES */
    isRefreshingVetCaseList: boolean
    isTryAgainButtonVisible: boolean
    /** SET STATES */
    makeRefreshVetCaseList: Dispatch<SetStateAction<boolean>>
    makeTryAgainButtonVisible: Dispatch<SetStateAction<boolean>>
}

const VetCaseIndicatorsContext = createContext({} as ContextSchema)

export const VetCaseIndicatorsProvider = ({ children }: WithChildren) => {
    const [isRefreshingVetCaseList, makeRefreshVetCaseList] = useState(true)
    const [isTryAgainButtonVisible, makeTryAgainButtonVisible] = useState(false)

    return (
        <VetCaseIndicatorsContext.Provider
            value={{
                makeRefreshVetCaseList,
                isRefreshingVetCaseList,
                isTryAgainButtonVisible,
                makeTryAgainButtonVisible,
            }}
        >
            {children}
        </VetCaseIndicatorsContext.Provider>
    )
}

export const useVetCaseIndicators = () => {
    const context = useContext(VetCaseIndicatorsContext)

    if (context) {
        return context
    }

    const errorMessage = "useVetCaseIndicators should be nested in VetCaseIndicatorsProvider"
    logger.error("REACT CONTEXT PROVIDER", errorMessage)
    throw new Error(errorMessage)
}