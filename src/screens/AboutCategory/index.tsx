import { ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react";

import { useViewModel } from './viewModel';
import ScreenView from "../../components/ScreenView";
import { Notification } from '../../models/Notification';
import { NotificationContext } from "../../context/NotificationContext";
import { DetailedInformationBox } from "../../components/DetailedInformationBox";
import { Visibility } from "../../components/Visibility";
import { AbsoluteArea } from "./styles";
import { UIActivityIndicator } from "react-native-indicators";

export function AboutCategory() {
  const isCurrentScreenFocused = useIsFocused();
  const { notificationListener, responseNotificationListener } = useContext(NotificationContext);

  const {
    vetCaseCategory,
    vetCasePriority,
    fetchVetCaseDetails,
    vetCaseCategoryDescription,
    isLoadingIndicatorDisplayed,
  } = useViewModel();

  useEffect(() => {
    if (isCurrentScreenFocused) {
      const notification = new Notification();
      Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() });

      fetchVetCaseDetails();
    }
  }, [isCurrentScreenFocused]);

  useLayoutEffect(
    useCallback(() => {
      notificationListener.current = Notifications.addNotificationReceivedListener(() => { });
      responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(() => { });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }, [])
  )

  return (
    <ScreenView>
      <ScrollView>
        <Visibility isVisible={isLoadingIndicatorDisplayed}>
          <AbsoluteArea>
            <UIActivityIndicator color='#757575' />
          </AbsoluteArea>
        </Visibility>

        <DetailedInformationBox
          value={vetCaseCategory}
          label="Categoria do Caso"
          iconZoneColor="#ff9800"
          icon={() => <MaterialIcons name={'category'} size={24} color={'#FFF'} />}
        />

        <DetailedInformationBox
          label="Descrição"
          iconZoneColor="#2196f3"
          value={vetCaseCategoryDescription}
          icon={() => <MaterialIcons name="description" size={21} color="#FFF" />}
        />

        <DetailedInformationBox
          label="Classificação"
          iconZoneColor="#5c6bc0"
          value={vetCasePriority}
          icon={() => <MaterialIcons name="priority-high" size={21} color="#FFF" />}
        />
      </ScrollView>
    </ScreenView>
  );
}

