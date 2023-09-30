import React from "react"

import { useViewModel } from "./viewModel"
import { MicrophoneIcon, TapArea } from "./styles"

interface Props {
    isVisible: boolean
}

export const RecordAudioButton = ({ isVisible }: Props) => {
    const { onRecord } = useViewModel()

    if (isVisible) {
        return (
            <TapArea onPress={onRecord}>
                <MicrophoneIcon />
            </TapArea>
        )
    }

    return null
}
