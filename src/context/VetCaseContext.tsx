import React, { Dispatch, useState, useContext, createContext } from "react"

import { VetCaseModel as VetCaseModel } from "../schemas/VetCase"
import { logger } from "../infra/adapters/logger-adapter"
import { WithChildren } from "../@types/common"
import { useServices } from "./ServicesContext"

interface VetCaseContextType {
    vetCase: VetCaseModel
    setVetCase: Dispatch<React.SetStateAction<VetCaseModel>>
    markVetCaseMessageAsRead(): Promise<void>
}

export const VetCaseContext = createContext<VetCaseContextType>({} as VetCaseContextType)

export function VetCaseProvider({ children }: WithChildren) {
    const { vetCaseService } = useServices()
    const [vetCase, setVetCase] = useState<VetCaseModel>({} as VetCaseModel)

    async function markVetCaseMessageAsRead(): Promise<void> {
        await vetCaseService.readMessages(vetCase.id)
    }

    return (
        <VetCaseContext.Provider
            value={{
                vetCase,
                setVetCase,
                markVetCaseMessageAsRead
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