import * as Notifications from "expo-notifications";
import React, { useContext, useEffect, useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import ListView from "./ListView";
import { useVetCaseList } from "./script";
import TryAgainButton from "./TryAgainButton";
import { channelName } from "../../utils/pusher";
import RefreshIndicator from "./RefreshIndicator";
import ScrollToTopButton from "./ScrollToTopButton";
import ScreenView from "../../components/ScreenView";
import { CHANNELS_EVENTS } from "../../schemas/Pusher";
import { UserContext } from "../../context/UserContext";
import { useIsFocused } from "@react-navigation/native";
import { Notification } from '../../models/Notification';
import { VetCaseChannel } from "../../schemas/VetCaseChannel";
import { NotificationContext } from "../../context/NotificationContext";
import { OrderVetCaseContext, OrderVetCaseProvider } from "../../context/OrderVetCases";

function VetCases() {
  const { fetchVetCaseList } = useVetCaseList();
  const isCurrentScreenFocused = useIsFocused();
  const { selected: selectedFilter } = useContext(OrderVetCaseContext);

  const { userData } = useContext(UserContext);
  const [isDisplayingButton, displayButton] = useState(false);
  const { pusherService, notificationListener, responseNotificationListener } = useContext(NotificationContext);

  useEffect(() => {
    if (isCurrentScreenFocused) {
      fetchVetCaseList(1, selectedFilter);
    }
  }, [isCurrentScreenFocused]);

  useEffect(() => {
    if (isCurrentScreenFocused) {
      const notification = new Notification();
      Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() });
    }
  }, [isCurrentScreenFocused]);

  useEffect(() => {
    setTimeout(() => pusherService.current.subscribe(channelName(userData!)), 1000);

    notificationListener.current = Notifications.addNotificationReceivedListener(() => {});
    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      pusherService.current.unsubscribe(channelName(userData!));
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseNotificationListener.current);
    }
  }, []);

  useEffect(() => {
    pusherService.current.bind(CHANNELS_EVENTS.NEW_CASE, (_: VetCaseChannel) => {
      fetchVetCaseList();
    });

    pusherService.current.bind(CHANNELS_EVENTS.NEW_MESSAGE, (_: VetCaseChannel) => {
      fetchVetCaseList();
    });
  }, []);

  return (
    <ScreenView>
      <Header />
      <Filter />
      <TryAgainButton />

      <RefreshIndicator />
      <ListView touchTheTop={displayButton} />
      <ScrollToTopButton isVisible={isDisplayingButton} />
    </ScreenView>
  );
}

export default () => (
  <OrderVetCaseProvider>
    <VetCases />
  </OrderVetCaseProvider>
);

