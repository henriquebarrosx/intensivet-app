import { useState } from "react"
import { useAudioRecord } from "../../context/RecordAudio"
import { useVetCaseMessagesContext } from "../../context/VetCaseMessagesContext"

export function useViewModel() {
    const vetCaseMessagesContext = useVetCaseMessagesContext()
    const { audioRecord, displayAudioRecordFeedback, setAudioRecord } = useAudioRecord()

    const [stopwatchSeconds, setStopwatchSeconds] = useState(0)

    function handleStopWatchCallback(): void {
        setStopwatchSeconds((prevValue) => prevValue + 1)
    }

    function getFormattedStopWatch(): string {
        const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0')
        const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    async function onSend(): Promise<void> {
        const file = await audioRecord.stop()
        displayAudioRecordFeedback(false)
        setAudioRecord()
        await vetCaseMessagesContext.sendFile(file)
    }

    async function onCancel(): Promise<void> {
        await audioRecord.cancel()
        displayAudioRecordFeedback(false)
        setAudioRecord(undefined)
    }

    return {
        onSend,
        onCancel,
        stopwatchSeconds,
        handleStopWatchCallback,
        formattedStopWatch: getFormattedStopWatch()
    }
}