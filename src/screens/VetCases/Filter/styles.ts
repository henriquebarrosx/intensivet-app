import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Content = styled.View`
  padding: 6px 0;
`;

export const HorizontalScrollViewArea = styled(ScrollView).attrs({
  horizontal: true
})`
  height: 60px;
  padding: 6px 0;
  margin: 10px 0 0 20px;
`;

interface FilterButtonProps {
  isSelected: boolean;
}

export const FilterOptionButton = styled.TouchableOpacity<FilterButtonProps>`
  height: 40px;
  margin-right: 16px;
  padding: 10px 35px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ isSelected, theme }) => isSelected ? theme.COLORS.primary : '#CCC'};
  background-color: ${({ isSelected, theme }) => isSelected ? theme.COLORS.primary : theme.COLORS.white};
`;

interface FilterTextProps {
  isSelected: boolean;
}

export const FilterText = styled.Text<FilterTextProps>`
  font-size: 14px;
  line-height: 19px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  color: ${({ theme, isSelected }) => isSelected ? theme.COLORS.white : theme.COLORS.gray};
`;