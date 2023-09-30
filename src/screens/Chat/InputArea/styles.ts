import styled from "styled-components/native"

import colors from "../../../utils/colors"
import { Animated, StyleSheet, TextInput, TextInputProps } from "react-native"

export const styles = StyleSheet.create({
    inputTextArea: {
        height: 90,
        width: "100%",
        display: "flex",
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        backgroundColor: colors.snow,
        justifyContent: "space-between",
    }
})

export const InputTextArea = styled(Animated.View)`
    height: 90px;
    width: 100%;
    display: flex;
    padding-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.snow};
`

export const LeftSide = styled.View`
    flex: 1;
    margin: 0 10px;
`

export const TextInputView = styled(TextInput) <TextInputProps>`
    display: flex;
    padding: 12px;
    min-height: 48px;
    max-height: 110px;
    border-radius: 10px;
    border: 1px solid #bdbdbd;
    margin-bottom: 16px;
    background-color: ${colors.white};
`
