import { Platform } from "react-native"
import styled from "styled-components/native"
import { Theme } from "../../../../../domain/entities/Theme"

export const Container = styled.SafeAreaView`
  margin: 8px 20px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: ${Platform.OS === "ios" ? 126 : 80}px;
`

export const ScreenTitle = styled.Text`
  font-size: 32px;
  line-height: 36px;
  color: ${Theme.colors.darkGray};
  font-family: ${Theme.fonts.BOLD};
`

export const AvatarArea = styled.View`
  overflow: hidden;
  border-radius: 30px;
`
