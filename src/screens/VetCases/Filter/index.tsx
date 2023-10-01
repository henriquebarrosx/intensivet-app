import React from "react"

import { useSession } from "../../../context/UserContext"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext"
import { Content, FilterOptionButton, FilterText, HorizontalScrollViewArea } from "./styles"

export default function VetCaseFilter() {
    const sessionContext = useSession()
    const vetCasesContext = useVetCasesContext()
    const { closeUnexpectedErrorModal } = useErrorsFeedback()

    const slaFilterLabel = sessionContext.isAdmin ? "Tempo da SLA" : "Categoria do caso"

    async function orderByLastMessage(): Promise<void> {
        closeUnexpectedErrorModal({ toRefresh: true })
        await vetCasesContext.orderByLastMessage()
    }

    async function orderBySla(): Promise<void> {
        closeUnexpectedErrorModal({ toRefresh: true })
        await vetCasesContext.orderBySla()
    }

    return (
        <Content>
            <HorizontalScrollViewArea showsHorizontalScrollIndicator={false}>
                <FilterOptionButton onPress={orderByLastMessage} isSelected={vetCasesContext.isOrderedByLastMessage}>
                    <FilterText isSelected={vetCasesContext.isOrderedByLastMessage}>
                        Mensagens Recebidas
                    </FilterText>
                </FilterOptionButton>

                <FilterOptionButton onPress={orderBySla} isSelected={vetCasesContext.isOrderedBySla}>
                    <FilterText isSelected={vetCasesContext.isOrderedBySla}>
                        {slaFilterLabel}
                    </FilterText>
                </FilterOptionButton>
            </HorizontalScrollViewArea>
        </Content>
    )
}
