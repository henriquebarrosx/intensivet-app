import { VirtualizedList } from "react-native"
import React, { useRef, Dispatch, useState, RefObject, useContext, createContext, SetStateAction } from "react"

import { WithChildren } from "../@types/common"
import { MessageModel } from "../schemas/Message"
import { Pagination } from "../schemas/Pagination"
import { VetCaseModel as VetCaseModel } from "../schemas/VetCase"

interface VetCaseContextType {
    pagination: Pagination
    setPagination: Dispatch<SetStateAction<Pagination>>
    vetCases: VetCaseModel[]
    setVetCases: Dispatch<React.SetStateAction<VetCaseModel[]>>
    virtualizedListRef: RefObject<VirtualizedList<VetCaseModel>>

    readMessages(vetCaseId: number): void
    addNewVetCase(vetCase: VetCaseModel): void
    updateLastMessage(message: MessageModel, isRead?: boolean): void
}

export const VetCasesContext = createContext<VetCaseContextType>(null)

export function VetCasesProvider({ children }: WithChildren) {
    const [vetCases, setVetCases] = useState<VetCaseModel[]>([])
    const virtualizedListRef = useRef<VirtualizedList<VetCaseModel>>(null)
    const [pagination, setPagination] = useState<Pagination>({} as Pagination)

    function addNewVetCase(vetCase): void {
        setVetCases((items) => [vetCase, ...items])
    }

    function updateLastMessage(message: MessageModel, isRead: boolean = false): void {
        const items = new Map<number, VetCaseModel>()

        function addOnBegining(data: VetCaseModel[]) {
            const vetCase = data.find((item) => item.id === message.vet_case_id)

            items.set(vetCase.id, {
                ...vetCase,
                last_message: {
                    message: message.message,
                    created_at: message.created_at,
                    message_type: message.message_type,
                    file_name: message?.file_name
                },
                unread_updates: vetCase.unread_updates += 1,
                unread_messages: vetCase.unread_messages += 1,
            })
        }

        function appendOtherMessages(data: VetCaseModel[]) {
            data.forEach((vetCase) => {
                if (items.has(vetCase.id)) {
                    console.log({ vetCase })
                    return
                }
                items.set(vetCase.id, vetCase)
            })
        }

        setVetCases((vetCases) => {
            addOnBegining(vetCases)
            appendOtherMessages(vetCases)
            return Array.from(items.values())
        })
    }

    function readMessages(vetCaseId: number): void {
        const items = new Map<number, VetCaseModel>()

        function addOnBegining(vetCases: VetCaseModel[]) {
            const vetCase = vetCases.find((item) => item.id === vetCaseId);
            items.set(vetCase.id, { ...vetCase, unread_updates: 0, unread_messages: 0 })
        }

        function appendOtherMessages(vetCases: VetCaseModel[]) {
            vetCases.forEach((vetCase) => {
                if (vetCaseId === vetCase.id) return
                items.set(vetCase.id, vetCase)
            })
        }

        setVetCases((vetCases) => {
            addOnBegining(vetCases)
            appendOtherMessages(vetCases)
            return Array.from(items.values())
        })
    }

    return (
        <VetCasesContext.Provider
            value={{
                vetCases,
                pagination,
                setVetCases,
                setPagination,
                virtualizedListRef,

                readMessages,
                addNewVetCase,
                updateLastMessage,
            }}
        >
            {children}
        </VetCasesContext.Provider>
    )
}

export function useVetCases() {
    const context = useContext(VetCasesContext)

    if (!context) {
        throw new Error("O contexto VetCasesContext precisa está contido na hierarquia de componentes!")
    }

    return context
}
