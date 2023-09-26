import { ScrollView, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react";

import { Avatar } from "./Avatar";
import { useViewModel } from "./viewModel";
import ScreenView from "../../components/ScreenView";
import { AbsoluteArea } from "../AboutClinic/styles";
import { Subtitle, Title, HeaderArea } from "./styles";
import { Notification } from '../../models/Notification';
import { Visibility } from "../../components/Visibility";
import { InformationBox } from "../../components/InformationBox";
import { SectionInfoTitle } from "../../components/SectionInfoTitle";
import { NotificationContext } from "../../context/NotificationContext";


export function AboutVet() {
  const isCurrentScreenFocused = useIsFocused();
  const { notificationListener, responseNotificationListener } = useContext(NotificationContext);

  const {
    title,
    vetCrmv,
    subtitle,
    avatarUri,
    vetBirthDate,
    vetPhoneNumber,
    handleFetchVetCaseData,
    isLoadingIndicatorDisplayed,
  } = useViewModel();

  useEffect(() => {
    if (isCurrentScreenFocused) {
      const notification = new Notification();
      Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() });

      handleFetchVetCaseData();
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
            <ActivityIndicator color='#757575' />
          </AbsoluteArea>
        </Visibility>

        <HeaderArea>
          <Avatar uri={avatarUri} />
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderArea>

        <SectionInfoTitle value="Sobre" />

        <InformationBox
          unified
          borderTop
          label='CRMV'
          value={vetCrmv}
          iconZoneColor='#5c6bc0'
          icon={() => <AntDesign name="idcard" size={19} color="#FFF" />}
        />

        <InformationBox
          unified
          label='Nascimento'
          value={vetBirthDate}
          iconZoneColor='#64b5f6'
          icon={() => <Ionicons name="ios-calendar" size={21} color="#FFF" />}
        />

        <InformationBox
          unified
          borderBottom
          label='Contato'
          value={vetPhoneNumber}
          iconZoneColor='#ff9800'
          icon={() => <FontAwesome name="phone" size={24} color="#FFF" />}
        />
      </ScrollView>
    </ScreenView>
  );
}

