import styled from "styled-components/native";
import { Theme } from "../../../domain/entities/Theme";

export const FormContainer = styled.View`
    flex: 1;
    gap: 8px;
    width: 90%;
    display: flex;
    align-content: center;
`;

export const KeyboardContainer = styled.KeyboardAvoidingView`
    flex: 1;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    background-color: ${Theme.colors.white};
`