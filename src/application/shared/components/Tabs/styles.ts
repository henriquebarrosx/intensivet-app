import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { Theme } from "../../../../domain/entities/Theme"

export const HorizontalScrollViewArea = styled(ScrollView)
    .attrs({ horizontal: true })`
    height: 60px;
    padding: 6px 0;
    margin: 10px 0 0 20px;
`;

interface TabContainerProps {
    isSelected: boolean;
}

export const TabContainer = styled.TouchableOpacity<TabContainerProps>`
    height: 40px;
    margin-right: 16px;
    padding: 10px 35px;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ isSelected }) => isSelected ? Theme.colors.primary : '#CCC'};
    background-color: ${({ isSelected }) => isSelected ? Theme.colors.primary : Theme.colors.white};
`;

interface LabelProps {
    isSelected: boolean;
}

export const Label = styled.Text<LabelProps>`
    font-size: 14px;
    line-height: 19px;
    font-family: ${Theme.fonts.MEDIUM};
    color: ${({ isSelected }) => isSelected ? Theme.colors.white : Theme.colors.gray};
`;