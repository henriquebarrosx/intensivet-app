import { useAudioRecord } from '../../../../../context/RecordAudio';
import { AudioRecordAdapter } from '../../../../../infra/adapters/audio-record';

export const useViewModel = () => {
    const { displayAudioRecordFeedback, setAudioRecord } = useAudioRecord();

    async function onRecord() {
        try {
            const audioRecord = new AudioRecordAdapter()
            await audioRecord.start()
            displayAudioRecordFeedback(true)
            setAudioRecord(audioRecord)
        }

        catch (error) {
            console.error(error);
        }
    }

    return { onRecord }
}