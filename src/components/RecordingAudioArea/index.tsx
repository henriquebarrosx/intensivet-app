import React, { useEffect } from "react";
import LottieView from 'lottie-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { styles } from "./styles";
import colors from "../../utils/colors";
import { useViewModel } from "./viewModel";
import RecordAudioAnimation from "../../../assets/animations/recordingAudio.json"

var timeOut: any = null;
const ONE_MINUTE = 1000;

export const RecordAudioAreaView = () => {
  const {
    onSend,
    onCancel,
    stopwatchSeconds,
    formattedStopWatch,
    handleStopWatchCallback,
  } = useViewModel();

  useEffect(() => {
    timeOut = setTimeout(() => {
      handleStopWatchCallback();
    }, ONE_MINUTE);

    return () => { clearTimeout(timeOut) }
  }, [stopwatchSeconds]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcon size={32} name="delete" color={colors.danger} />
        </TouchableOpacity>

        <View style={styles.recordFeedback}>
          <Text style={styles.stopWatchText}>{formattedStopWatch}</Text>

          <View style={styles.animationArea}>
            <LottieView
              loop
              autoPlay
              style={{ flex: 1 }}
              resizeMode="contain"
              source={RecordAudioAnimation}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.onSend} onPress={onSend}>
          <MaterialIcon size={21} name="send" color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}