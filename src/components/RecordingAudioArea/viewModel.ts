import { useContext, useState } from "react"
import { useChat } from "../../context/ChatContext"
import { UserContext } from "../../context/UserContext"
import { useVetCase } from "../../context/VetCaseContext"
import { useAudioRecord } from "../../context/RecordAudio"
import { sendFileMessage } from "../../services/network/chat"
import { MessageMapper } from "../../infra/mappers/message-mapper"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const { sessionData: userData } = useContext(UserContext)
    const { id: vetCaseId } = useVetCase().vetCase
    const { audioRecord, displayAudioRecordFeedback, setAudioRecord } = useAudioRecord()

    const [stopwatchSeconds, setStopwatchSeconds] = useState(0)

    const handleStopWatchCallback = () => {
        setStopwatchSeconds((prevValue) => prevValue + 1)
    }

    const formattedStopWatch = (): string => {
        const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0')
        const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    const onSend = async (): Promise<void> => {
        const accessToken = userData?.current_account?.access_token
        const assetFile = await audioRecord.stop()

        chatViewModel.displaySendFeedback(true)
        displayAudioRecordFeedback(false)
        setAudioRecord()

        try {
            const response = await sendFileMessage({
                vetCaseId,
                accessToken,
                file: assetFile,
                onDownloadProgress: () => { },
            })

            await chatViewModel.insertMessage(MessageMapper.apply(response))
            chatViewModel.scrollToBottom()
        }

        catch (error) {
            console.error(error)
            console.error('There was an error after tries to upload a recorded audio')
        }

        finally {
            chatViewModel.displaySendFeedback(false)
        }
    }

    const onCancel = async (): Promise<void> => {
        await audioRecord.cancel()
        displayAudioRecordFeedback(false)
        setAudioRecord(undefined)
    }

    return {
        onSend,
        onCancel,
        stopwatchSeconds,
        handleStopWatchCallback,
        formattedStopWatch: formattedStopWatch()
    }
}