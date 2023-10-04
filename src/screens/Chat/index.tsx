import React, { Fragment, useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"

import Messages from "./Messages"
import { InputArea } from "./InputArea"
import ModalAttachment from "./ModalAttachment"
import ScreenView from "../../components/ScreenView"
import ModalToVideoPreview from "./ModalToPreview/Video"
import ModalToImagePreview from "./ModalToPreview/Image"
import { useVetCase } from "../../context/VetCaseContext"
import { MessageProvider } from "../../context/MessageContext"
import { AudioRecordProvider } from "../../context/RecordAudio"
import { useVetCasesContext } from "../../context/VetCasesContext"
import { FileAttachmentModalProvider } from "../../context/AttachModal"
import { useVetCaseMessagesContext } from "../../context/VetCaseMessagesContext"

interface Props {
    route: { params: { videoUri: string } }
}

function Chat(props: Props) {
    const isCurrentScreenFocused = useIsFocused()
    const videoUri = props?.route?.params?.videoUri

    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            const INITIAL_PAGE = 1
            const IS_LOADER_VISIBLE = !videoUri
            vetCaseMessagesContext.findAll(INITIAL_PAGE, IS_LOADER_VISIBLE)
        }

        return () => {
            vetCaseContext.reset()
            vetCaseMessagesContext.reset()
            vetCasesContext.readMessages(vetCaseContext.data.id)
        }
    }, [isCurrentScreenFocused])

    return (
        <Fragment>
            <ScreenView>
                <Messages />
                <InputArea />
            </ScreenView>

            <ModalToImagePreview />
            <ModalToVideoPreview />
            <ModalAttachment assetMediaUri={videoUri} />
        </Fragment>
    )
}

export default (props: Props) => (
    <MessageProvider>
        <FileAttachmentModalProvider>
            <AudioRecordProvider>
                <Chat {...props} />
            </AudioRecordProvider>
        </FileAttachmentModalProvider>
    </MessageProvider>
)
