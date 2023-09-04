import React from "react";

import {
  Divider,
  Container,
  BoxIconArea,
  SectionTitle,
  TopSideContainer,
  SectionTitleValue,
} from "./styles";

interface Props {
  icon: any;
  label: string;
  value: string;
  iconZoneColor: string;
}

export function DetailedInformationBox(props: Props) {
  const { icon: InfoIcon, iconZoneColor, label, value } = props;

  return (
    <Container>
      <TopSideContainer>
        <BoxIconArea color={iconZoneColor}>
          <InfoIcon />
        </BoxIconArea>

        <SectionTitle>{label}</SectionTitle>
      </TopSideContainer>

      <Divider />

      <SectionTitleValue>{value}</SectionTitleValue>
    </Container>
  )
}