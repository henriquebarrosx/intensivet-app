import React from "react"
import { Container } from "./styles"
import theme from "../../../../../theme"
import { BarIndicator } from "react-native-indicators"

interface Props {
    isPlaying: boolean
    shouldDisplayWhiteLayout: boolean
}

export function GroupPlayingFeedback({ isPlaying, shouldDisplayWhiteLayout }: Props) {
    const color = shouldDisplayWhiteLayout ? theme.COLORS.white : theme.COLORS.gray

    const elements = [
        { positionFromLeft: 0 },
        { positionFromLeft: 22 },
        { positionFromLeft: 44 },
        { positionFromLeft: 66 },
    ]

    return (
        <Container>
            {elements.map(({ positionFromLeft }, index) =>
                <BarIndicator
                    size={16}
                    key={index}
                    color={color}
                    animating={isPlaying}
                    hidesWhenStopped={false}
                    style={{ position: "absolute", left: positionFromLeft }}
                />
            )}
        </Container>
    )
}