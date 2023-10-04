import React, { Dispatch, useState, useContext, createContext } from "react"

import { WithChildren } from "../@types/common"
import { logger } from "../infra/adapters/logger-adapter"
import { VetCaseModel as VetCaseModel } from "../schemas/VetCase"

type VetCaseContextType = {
    data: VetCaseModel
    reset(): void
    changeOpenedChat(data: VetCaseModel | null): void
}

export const VetCaseContext = createContext<VetCaseContextType>({} as VetCaseContextType)

export function VetCaseProvider({ children }: WithChildren) {
    const [openedVetCase, changeOpenedChat] = useState<VetCaseModel | null>(null)

    function reset() {
        changeOpenedChat(null)
    }

    return (
        <VetCaseContext.Provider
            value={{
                data: openedVetCase,
                changeOpenedChat,
                reset,
            }}>
            {children}
        </VetCaseContext.Provider>
    )
}

export const useVetCase = () => {
    const context = useContext(VetCaseContext)

    if (context) {
        return context
    }

    const errorMessage = "useVetCase must to be nested in VetCaseProvider"
    logger.error("REACT CONTEXT PROVIDER", errorMessage)
    throw new Error(errorMessage)
}