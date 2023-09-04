import { Audio } from 'expo-av';
import { useAudioRecord } from '../../../../../context/RecordAudio';
import { requestAudioMicrophonePermission } from '../../../../../utils/permissions/microphone';

export const useViewModel = () => {
  const { setRecording, recordAudio } = useAudioRecord();

  const onRecord = async () => {
    const granted = await requestAudioMicrophonePermission();

    if (granted) {
      try {
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );

        setRecording(recording);
        recordAudio(true);
      }

      catch (error) {
        console.log(error);
      }
    }
  }

  return { onRecord }
}