import styled from "styled-components/native"
import { Theme } from "../../../../../domain/entities/Theme"

export const ButtonContainer = styled.TouchableOpacity`
    height: 58px;
    margin: 14px 0;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    background-color: ${Theme.colors.primary};
`

export const ButtonText = styled.Text`
    font-size: 18px;
    color: ${Theme.colors.white};
`

export const LoaderContainer = styled.View`
    height: 30px;
`