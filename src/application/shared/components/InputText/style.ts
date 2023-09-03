import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../../../../domain/entities/Theme";

export const Label = styled.Text`
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 6px;
    color: ${Theme.colors.gray};
`;

interface InputContent {
    hasError: boolean;
}

export const Container = styled.View<InputContent>`
    height: 56px;
    padding: 0 19px;
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${({ hasError }) => {
        return hasError ? Theme.colors.danger : Theme.colors.lightGray;
    }};
`;

interface InputProps extends TextInputProps {
    hasSecureIndicator: boolean;
}

export const Input = styled(TextInput) <InputProps>`
    width: ${(props) => !!props.hasSecureIndicator ? '85%' : '100%'};
`;

export const ValidationMessage = styled.Text`
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 6px;
    color: ${Theme.colors.danger};
`;