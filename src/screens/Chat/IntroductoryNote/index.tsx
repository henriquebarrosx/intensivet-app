import React from "react"
import { Container, Label } from "./styles"
import { useSession } from "../../../context/UserContext"
import { useVetCaseContext } from "../../../context/VetCaseContext"
import { localDate } from "../../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../../infra/adapters/local-date-adapter/index.gateway"

export default function WelcomeChatMessage() {
    const sessionContext = useSession()
    const vetCaseContext = useVetCaseContext()

    function buildDescription(): string {
        const period = vetCaseContext.data.started_at

        const date = localDate.format(period, LocalDateFormatEnum.date)
        const time = localDate.format(period, LocalDateFormatEnum.time)

        const formattedPeriod = localDate.isToday(period)
            ? `às ${time}`
            : `às ${time} do dia ${date}`

        return sessionContext.isAdmin
            ? `Olá, um novo caso foi encaminhado para atendimento ${formattedPeriod}`
            : `Olá, seu caso foi recebido ${formattedPeriod} e está em análise. Em breve entraremos em contato.`
    }

    return (
        <Container>
            <Label>{buildDescription()}</Label>
        </Container>
    )
}
