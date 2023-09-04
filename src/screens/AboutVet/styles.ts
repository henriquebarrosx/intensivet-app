import styled from "styled-components/native";

export const HeaderArea = styled.View`
  margin: 32px 0 24px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin-top: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
