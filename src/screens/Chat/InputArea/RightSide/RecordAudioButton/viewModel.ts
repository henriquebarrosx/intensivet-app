import { useAudioRecord } from "../../../../../context/RecordAudio"
import { logger } from "../../../../../infra/adapters/logger-adapter"
import { AudioRecordAdapter } from "../../../../../infra/adapters/audio-record"

export const useViewModel = () => {
    const { displayAudioRecordFeedback, setAudioRecord } = useAudioRecord()

    async function onRecord() {
        try {
            const audioRecord = new AudioRecordAdapter()
            const record = await audioRecord.start()

            if (record) {
                displayAudioRecordFeedback(true)
                setAudioRecord(audioRecord)
                return
            }
        }

        catch (error) {
            logger.error("AUDIO RECORD", "Something wrong when recording audio voice", { cause: error?.message })
        }
    }

    return { onRecord }
}