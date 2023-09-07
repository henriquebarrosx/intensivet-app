import { Platform } from "react-native"
import styled from "styled-components/native"
import { getBottomSpace } from "react-native-iphone-x-helper"

import colors from "../../../utils/colors"

export const Root = styled.View`
    height: 60px;
    display: flex;
    margin: 10px 0;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${colors.snow};
    margin-bottom: ${({ isToggled }) => {
        const toggledSpace = Platform.OS === "ios" ? 56 : 10
        return isToggled ? `${toggledSpace}px` : `${getBottomSpace()}px`
    }};   
`

export const LeftSide = styled.View`
    flex: 1;
    margin: 0 10px;
`

export const TextInputView = styled.TextInput`
    display: flex;
    min-height: 48px;
    max-height: 110px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #bdbdbd;
    background-color: ${colors.white};
`
