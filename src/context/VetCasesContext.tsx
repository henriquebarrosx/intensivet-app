import React, { useContext, createContext } from "react"

import { WithChildren } from "../@types/common"
import { logger } from "../infra/adapters/logger-adapter"
import { IVetCasesContext, useVetCases } from "../app/react-hooks/vet-cases/index.hook"

export const VetCasesContext = createContext<IVetCasesContext>(null)

export function VetCasesProvider({ children }: WithChildren) {
    return (
        <VetCasesContext.Provider value={useVetCases()}>
            {children}
        </VetCasesContext.Provider>
    )
}

export function useVetCasesContext() {
    const context = useContext(VetCasesContext)

    if (!context) {
        logger.error("REACT CONTEXT PROVIDER", "useVetCases should be nested in VetCasesProvider")
        throw new Error("useVetCases should be nested in VetCasesProvider")
    }

    return context
}
