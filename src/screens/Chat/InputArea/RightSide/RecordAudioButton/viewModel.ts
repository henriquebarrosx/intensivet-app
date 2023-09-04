import { useAudioRecord } from '../../../../../context/RecordAudio';
import { AudioRecord } from '../../../../../Entities/AudioRecord';

export const useViewModel = () => {
    const { displayAudioRecordFeedback, setAudioRecord } = useAudioRecord();

    async function onRecord() {
        try {
            const audioRecord = new AudioRecord()
            await audioRecord.start()
            displayAudioRecordFeedback(true)
            setAudioRecord(audioRecord)
        }

        catch (error) {
            console.log(error);
        }
    }

    return { onRecord }
}