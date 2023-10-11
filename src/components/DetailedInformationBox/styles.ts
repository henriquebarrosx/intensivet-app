import styled from "styled-components/native";

export const Container = styled.View`
  margin: 20px;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.white};
`;

export const TopSideContainer = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`

interface BoxIconAreaProps {
  color: string
}

export const BoxIconArea = styled.View<BoxIconAreaProps>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

export const Divider = styled.View`
  width: 90%;
  height: 1px;
  align-self: flex-end;
  background-color: #e0e0e0;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  line-height: 22px;
  margin-left: 12px;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;

export const SectionTitleValue = styled.Text`
  font-size: 16px;
  margin-top: 16px;
  line-height: 22px;
  margin-left: 36px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.COLORS.gray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const SectionDescription = styled.Text`
  font-size: 18px;
  margin-top: 42px;
  line-height: 22px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const SectionDescriptionValue = styled.Text`
  font-size: 16px;
  margin-top: 8px;
  line-height: 22px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.COLORS.darkGray};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;