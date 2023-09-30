import { useAudioRecord } from "../../../../../context/RecordAudio"
import { logger } from "../../../../../infra/adapters/logger-adapter"
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
            logger.error("AUDIO RECORD", "Something wrong when recording audio voice", { cause: error?.message })
        }
    }

    return { onRecord }
}