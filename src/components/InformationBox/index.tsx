import React from "react";

import {
  Divider,
  InfoView,
  Container,
  ActionText,
  ActionIconBox,
  InfoViewValue,
  LeftInfoViewSide,
} from "./styles";

export interface Props {
  icon: any;
  label: string;
  unified?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  iconZoneColor: string;
  value: string | number | boolean | undefined;
}

export function InformationBox(props: Props) {
  const {
    label,
    value,
    iconZoneColor,
    icon: InfoIcon,
    unified = false,
    borderTop = !props.unified,
    borderBottom = !props.unified,
  } = props;

  return (
    <Container unified={unified} hasBorderTop={borderTop} hasBorderBottom={borderBottom}>
      <InfoView>
        <LeftInfoViewSide>
          <ActionIconBox color={iconZoneColor}>
            <InfoIcon />
          </ActionIconBox>

          <ActionText>{label}</ActionText>
        </LeftInfoViewSide>

        <InfoViewValue ellipsizeMode="tail" numberOfLines={1}>
          {value || '---'}
        </InfoViewValue>
      </InfoView>

      <Divider />
    </Container>
  )
}
