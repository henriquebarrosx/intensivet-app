import React, { useEffect } from "react";
import { WebView } from 'react-native-webview';
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";

import { Notification } from '../../models/Notification';

interface Props {
  route: { params: { source: string; } }
}

const WebPage = ({ route }: Props) => {
  const { source } = route.params;
  const isCurrentScreenFocused = useIsFocused();

  useEffect(() => {
    if (isCurrentScreenFocused) {
      const notification = new Notification();
      Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() });
    }
  }, [isCurrentScreenFocused]);

  return <WebView source={{ uri: source }} />
}

export default WebPage;