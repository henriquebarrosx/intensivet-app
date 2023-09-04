import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import RecordAudioAnimation from "../../../../assets/recordingAudio.json"

import { styles } from './styles';

interface Props {
  isRecording: boolean;
}

var timeOut: any = null;
const ONE_MINUTE = 1000;

export const StopWatch = ({ isRecording = true }: Props) => {
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);

  const handleStopWatchCallback = () => {
    timeOut = setTimeout(() => {
      setStopwatchSeconds((prevValue) => {
        const doNotStartedYet = !isRecording && !!stopwatchSeconds;
        return doNotStartedYet ? 0 : prevValue + 1;
      });
    }, ONE_MINUTE);
  }

  const formattedStopWatch = (): string => {
    const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
    const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    handleStopWatchCallback();
    return () => { clearTimeout(timeOut) }
  }, [stopwatchSeconds]);

  if (isRecording) {
    return (
      <View style={styles.recordFeedbackArea}>
        <View style={styles.recordFeedback}>
          <LottieView
            loop
            autoPlay
            style={{ flex: 1 }}
            resizeMode="contain"
            source={RecordAudioAnimation}
          />
        </View>

        <Text style={styles.iconText}>{formattedStopWatch()}</Text>
      </View>
    )
  }

  return null;
}