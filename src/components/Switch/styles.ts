import styled from "styled-components/native";

export const SwitchArea = styled.View`
  padding: 0 20px;
  min-height: 52px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SwitchLabel = styled.Text`
  font-size: 16px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;
