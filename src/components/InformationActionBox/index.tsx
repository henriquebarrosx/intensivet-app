import React from "react";
import { Ionicons } from '@expo/vector-icons';

import {
  Divider,
  InfoView,
  Container,
  ActionText,
  ActionIconBox,
  InfoViewValue,
  LeftInfoViewSide,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../routes/index.routes";

export interface Props {
  icon: any;
  label: string;
  unified?: boolean;
  disabled?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  iconZoneColor: string;
  redirectToPath: keyof Routes;
}

export function InformationActionBox(props: Props) {
  const {
    label,
    iconZoneColor,
    redirectToPath,
    icon: InfoIcon,
    unified = false,
    disabled = false,
    borderTop = !props.unified,
    borderBottom = !props.unified,
  } = props;

  const { navigate } = useNavigation();

  return (
    <Container unified={unified} hasBorderTop={borderTop} hasBorderBottom={borderBottom}>
      <InfoView onPress={() => navigate(redirectToPath)} disabled={disabled}>
        <LeftInfoViewSide>
          <ActionIconBox color={iconZoneColor}>
            <InfoIcon />
          </ActionIconBox>

          <ActionText>{label}</ActionText>
        </LeftInfoViewSide>

        <Ionicons name="ios-chevron-forward" size={24} color="gray" />
      </InfoView>

      <Divider />
    </Container>
  )
}
