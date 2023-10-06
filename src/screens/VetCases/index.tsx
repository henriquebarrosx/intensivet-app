import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import Filter from "./Filter"
import Header from "./Header"
import ListView from "./ListView"
import TryAgainButton from "./TryAgainButton"
import RefreshIndicator from "./RefreshIndicator"
import ScrollToTopButton from "./ScrollToTopButton"
import ScreenView from "../../components/ScreenView"
import { useVetCaseContext } from "../../context/VetCaseContext"
import { useVetCasesContext } from "../../context/VetCasesContext"
import { pushNotification } from "../../infra/adapters/push-notification"

export default function VetCases() {
    const vetCaseContext = useVetCaseContext()
    const vetCasesContext = useVetCasesContext()
    const isCurrentScreenFocused = useIsFocused()

    const [isDisplayingButton, displayButton] = useState(false)

    useEffect(() => {
        if (isCurrentScreenFocused) {
            const DEFAULT_PAGE = 1
            vetCaseContext.changeOpenedChat(null)
            pushNotification.enableNotificationsLocally()
            vetCasesContext.findAll(DEFAULT_PAGE, vetCasesContext.orderedBy)
        }
    }, [isCurrentScreenFocused])

    return (
        <ScreenView>
            <Header />
            <Filter />
            <TryAgainButton />

            <RefreshIndicator />
            <ListView touchTheTop={displayButton} />
            <ScrollToTopButton isVisible={isDisplayingButton} />
        </ScreenView>
    )
}
