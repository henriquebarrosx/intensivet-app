import { logger } from "../../../../../infra/adapters"
import { useAudioRecord } from "../../../../../context/RecordAudio"
import { AudioRecordAdapter } from "../../../../../infra/adapters/audio-record"

export const useViewModel = () => {
    const { displayAudioRecordFeedback, setAudioRecord } = useAudioRecord()

    async function onRecord() {
        try {
            const audioRecord = new AudioRecordAdapter()
            await audioRecord.start()
            displayAudioRecordFeedback(true)
            setAudioRecord(audioRecord)
        }

        catch (error) {
            await logger.error("AUDIO RECORD", "Something wrong when recording audio voice", { cause: error?.message })
        }
    }

    return { onRecord }
}