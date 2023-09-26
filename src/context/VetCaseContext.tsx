import React, { Dispatch, useState, useContext, createContext } from "react"

import { WithChildren } from "../@types/common"
import { VetCaseModel as VetCaseModel } from "../schemas/VetCase"
import { httpClient } from "../infra/adapters/http-client-adapter"
import { VetCaseService } from "../infra/services/vet-case-service"

interface VetCaseContextType {
    vetCase: VetCaseModel
    setVetCase: Dispatch<React.SetStateAction<VetCaseModel>>
    markVetCaseMessageAsRead(): Promise<void>
}

export const VetCaseContext = createContext<VetCaseContextType>({} as VetCaseContextType)

export function VetCaseProvider({ children }: WithChildren) {
    const [vetCase, setVetCase] = useState<VetCaseModel>({} as VetCaseModel)

    async function markVetCaseMessageAsRead(): Promise<void> {
        const vetCaseService = new VetCaseService(httpClient)
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

    throw new Error("O contexto VetCaseContext precisa está contido na hierarquia de componentes!")
}