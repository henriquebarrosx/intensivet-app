import React, { memo } from "react"
import { useNavigation } from "@react-navigation/native"

import SlaMessages from "./SlaMessages"
import ReceivedMessages from "./ReceivedMessages"
import { VetCaseModel } from "../../../schemas/VetCase"
import { useVetCase } from "../../../context/VetCaseContext"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { localDate } from "../../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../../infra/adapters/local-date-adapter/index.gateway"

export interface Props {
    item: VetCaseModel
}

export default memo(({ item }: Props) => {
    const navigation = useNavigation()
    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCasesContext()

    function navigateToChat(): void {
        vetCasesContext.readMessages(item.id)
        vetCaseContext.changeOpenedChat(item)

        navigation.navigate("Chat", {
            vetCaseId: item.id,
            petName: item.pet.name,
            clinicFantasyName: item.clinic.fantasy_name,
        })
    }

    function getLastUpdate(): string {
        const period = localDate.toZone(item?.last_message?.created_at || item.created_at)

        return localDate.isToday(period)
            ? localDate.format(period, LocalDateFormatEnum.time)
            : localDate.format(period, LocalDateFormatEnum.date)
    }

    const hasUnreadMessages = !!item.unread_messages
    const messagePeriodStyle = { color: hasUnreadMessages ? "#48BACC" : "#757575" }

    const Template = () => {
        return vetCasesContext.isOrderedByLastMessage
            ? <ReceivedMessages
                vetCase={item}
                timeStyle={messagePeriodStyle}
                lastUpdate={getLastUpdate()}
                navigateToChat={navigateToChat}
                thereIsUnreadMessages={hasUnreadMessages}
            />
            : <SlaMessages vetCase={item} navigateToChat={navigateToChat} />
    }

    return <Template />
})
