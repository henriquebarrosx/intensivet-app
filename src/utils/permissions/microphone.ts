import { Audio } from 'expo-av';
import { Camera } from "expo-camera";
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DUCK_OTHERS } from 'expo-av/build/Audio';

export const requestCameraMicrophonePermission = async (): Promise<boolean> => {
  const currentPermission = await Camera.getMicrophonePermissionsAsync();

  if (currentPermission.status == 'granted') {
    return true;
  }

  const permissionResult = await Camera.requestMicrophonePermissionsAsync();
  return permissionResult.granted;
}

export const requestAudioMicrophonePermission = async (setAudioMode: boolean | undefined = true): Promise<boolean> => {
  const currentPermission = await Audio.getPermissionsAsync();

  if (currentPermission.status == 'granted' && setAudioMode) {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    return true;
  }

  const permissionResult = await Audio.requestPermissionsAsync();
  return permissionResult.granted;
}