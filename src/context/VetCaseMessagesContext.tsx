import React, { useContext, createContext } from "react"

import { WithChildren } from "../@types/common"
import { logger } from "../infra/adapters/logger-adapter"
import { IVetCaseMessagesContext, useVetCaseMessages } from "../app/react-hooks/vet-case-messages"

export const VetCaseMessagesContext = createContext<IVetCaseMessagesContext>(null)

export function VetCaseMessagesProvider({ children }: WithChildren) {
    return (
        <VetCaseMessagesContext.Provider value={useVetCaseMessages()}>
            {children}
        </VetCaseMessagesContext.Provider>
    )
}

export function useVetCaseMessagesContext() {
    const context = useContext(VetCaseMessagesContext)

    if (!context) {
        logger.error("REACT CONTEXT PROVIDER", "useVetCaseMessagesContext should be nested in VetCaseMessagesProvider")
        throw new Error("useVetCaseMessagesContext should be nested in VetCaseMessagesProvider")
    }

    return context
}
