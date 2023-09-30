import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.darkGray};
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    text-align: ${Platform.OS === 'ios' ? 'center' : 'left'};
`;

export const Subtitle = styled.Text`
    font-size: 13px;
    line-height: 18px;
    color: ${({ theme }) => theme.COLORS.gray};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    text-align: ${Platform.OS === 'ios' ? 'center' : 'left'};
`

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;