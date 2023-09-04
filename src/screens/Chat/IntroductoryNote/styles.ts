import styled from "styled-components/native";

export const BlueNoteArea = styled.View`
  margin: 30px 0;
  max-width: 300px;
  padding: 16px 18px;
  align-self: center;
  border-radius: 12px;
  transform: scaleY(-1);
  border: 1px solid ${({ theme }) => theme.COLORS.primary};
  background-color: ${({ theme }) => theme.COLORS.lightPrimary};
`;

export const NoteText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;