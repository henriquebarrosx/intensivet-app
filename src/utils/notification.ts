import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import { Session } from "../models/Session";
import { removeExpoToken, saveExpoToken } from "../services/network/notification";

export const addRequiredAndroidSettings = () => {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

export const getExpoPushNoficiationToken = async (): Promise<string | undefined> => {
  if (Constants.isDevice) {
    const deviceNotificationPermission = await Notifications.getPermissionsAsync();

    if (!deviceNotificationPermission.granted) {
      requestNotificationPermission();
    }

    return await generateExpoToken();
  }

  if (Platform.OS === "android") {
    addRequiredAndroidSettings();
  }

  return
}

const requestNotificationPermission = async () => {
  const notificationPermission = await Notifications.requestPermissionsAsync();

  if (notificationPermission.granted) {
    if (Platform.OS === 'android') {
      addRequiredAndroidSettings();
    }

    return await generateExpoToken();
  }

  alert("Must use physical device for Push Notifications");
}

export const generateExpoToken = async (): Promise<string> => {
  return (await Notifications.getExpoPushTokenAsync({
    projectId: "369e150f-abfc-4e24-9ee5-88a2db8bd8a3"
  }))?.data;
}

export const enablePushNotification = async (): Promise<string> => {
  const userData = await new Session().get();
  const expoToken = await generateExpoToken();
  const accessToken = userData?.current_account?.access_token!

  await saveExpoToken(accessToken, expoToken);
  await new Session().set({ ...userData!, expoToken });

  return expoToken;
}

export const disablePushNotification = async (): Promise<void> => {
  const userData = await new Session().get();
  const accessToken = userData?.current_account?.access_token!

  await removeExpoToken(accessToken);
  await new Session().set({ ...userData!, expoToken: '' });
}