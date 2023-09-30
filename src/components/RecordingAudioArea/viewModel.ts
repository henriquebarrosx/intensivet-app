import { useState } from "react"
import { useChat } from "../../context/ChatContext"
import { useVetCase } from "../../context/VetCaseContext"
import { useAudioRecord } from "../../context/RecordAudio"
import { useServices } from "../../context/ServicesContext"
import { MessageMapper } from "../../infra/mappers/message-mapper"

export const useViewModel = () => {
    const chatViewModel = useChat()
    const { messageService } = useServices()
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
        try {
            const assetFile = await audioRecord.stop()
            chatViewModel.displaySendFeedback(true)
            displayAudioRecordFeedback(false)
            setAudioRecord()

            const response = await messageService.create(
                vetCaseId,
                { file: assetFile },
                () => chatViewModel.displaySendFeedback(false)
            )

            await chatViewModel.insertMessage(MessageMapper.apply(response))
            chatViewModel.scrollToBottom()
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