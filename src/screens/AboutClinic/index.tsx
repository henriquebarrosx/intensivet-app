import { ScrollView, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react";

import { Avatar } from "./Avatar";
import { useViewModel } from "./viewModel";
import ScreenView from "../../components/ScreenView";
import { Notification } from '../../models/Notification';
import { Visibility } from "../../components/Visibility";
import { InformationBox } from "../../components/InformationBox";
import { SectionInfoTitle } from "../../components/SectionInfoTitle";
import { Subtitle, Title, HeaderArea, AbsoluteArea } from "./styles";
import { NotificationContext } from "../../context/NotificationContext";

export function AboutClinic() {
  const isCurrentScreenFocused = useIsFocused();
  const { notificationListener, responseNotificationListener } = useContext(NotificationContext);

  const {
    avatarUri,
    clinicCnpj,
    clinicCep,
    clinicName,
    clinicEmail,
    clinicAddress,
    clinicLocation,
    clinicPhoneNumber,
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
            <ActivityIndicator size={32} color='#757575' />
          </AbsoluteArea>
        </Visibility>

        <HeaderArea>
          <Avatar uri={avatarUri} />
          <Title>{clinicName}</Title>
          <Subtitle>{clinicEmail}</Subtitle>
        </HeaderArea>

        <SectionInfoTitle value="Sobre" />

        <InformationBox
          unified
          borderTop
          label='CNPJ'
          value={clinicCnpj}
          iconZoneColor='#64b5f6'
          icon={() => <FontAwesome name="id-card-o" size={18} color="#FFF" />}
        />

        <InformationBox
          unified
          borderBottom
          label='Contato'
          value={clinicPhoneNumber}
          iconZoneColor='#eda02d'
          icon={() => <FontAwesome5 name="phone-alt" size={21} color="#FFF" />}
        />

        <SectionInfoTitle value="Endereço" />

        <InformationBox
          unified
          borderTop
          label='CEP'
          value={clinicCep}
          iconZoneColor='#9ccc65'
          icon={() => <Ionicons name="location" size={21} color="#FFF" />}
        />

        <InformationBox
          unified
          label='Endereço'
          value={clinicAddress}
          iconZoneColor='#5c6bc0'
          icon={() => <FontAwesome name="street-view" size={21} color="#FFF" />}
        />

        <InformationBox
          unified
          borderBottom
          label='Localidade'
          value={clinicLocation}
          iconZoneColor='#f06292'
          icon={() => <FontAwesome5 name="city" size={16} color="#FFF" />}
        />
      </ScrollView>
    </ScreenView>
  );
}
