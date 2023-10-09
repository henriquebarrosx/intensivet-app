import React, { Fragment, useEffect } from "react"

import Messages from "./Messages"
import { InputArea } from "./InputArea"
import ModalAttachment from "./ModalAttachment"
import { injectChatProviders } from "../../context"
import ScreenView from "../../components/ScreenView"
import { useVetCaseContext } from "../../context/VetCaseContext"
import { useVetCasesContext } from "../../context/VetCasesContext"
import { useVetCaseMessagesContext } from "../../context/VetCaseMessagesContext"

type Props = {
    route: {
        params: {
            videoUri: string
        }
    }
}

function Chat(props: Props) {
    const videoUri = props?.route?.params?.videoUri

    const vetCaseContext = useVetCaseContext()
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()

    useEffect(() => {
        const INITIAL_PAGE = 1
        const IS_LOADER_VISIBLE = !videoUri
        vetCaseMessagesContext.findAll(INITIAL_PAGE, IS_LOADER_VISIBLE)

        return () => {
            vetCaseMessagesContext.reset()
            vetCasesContext.readMessages(vetCaseContext.data.id)
        }
    }, [])

    return (
        <Fragment>
            <ScreenView>
                <Messages />
                <InputArea />
            </ScreenView>

            <ModalAttachment assetMediaUri={videoUri} />
        </Fragment>
    )
}

export default injectChatProviders(Chat)
