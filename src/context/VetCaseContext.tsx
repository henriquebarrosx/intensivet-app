import React, { useState, useContext, createContext } from "react"

import { WithChildren } from "../@types/common"
import { logger } from "../infra/adapters/logger-adapter"
import { VetCaseModel as VetCaseModel } from "../schemas/VetCase"

type VetCaseContextType = {
    data: VetCaseModel
    changeOpenedChat(data: VetCaseModel | null): void
}

export const VetCaseContext = createContext<VetCaseContextType>({} as VetCaseContextType)

export function VetCaseProvider({ children }: WithChildren) {
    const [openedVetCase, changeOpenedChat] = useState<VetCaseModel | null>(null)

    return (
        <VetCaseContext.Provider
            value={{
                data: openedVetCase,
                changeOpenedChat,
            }}>
            {children}
        </VetCaseContext.Provider>
    )
}

export function useVetCaseContext() {
    const context = useContext(VetCaseContext)

    if (context) return context

    logger.error("REACT CONTEXT PROVIDER", "useVetCase must to be nested in VetCaseProvider")
    throw new Error("useVetCase must to be nested in VetCaseProvider")
}