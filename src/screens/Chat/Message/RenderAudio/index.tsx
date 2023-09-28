import { Audio } from "expo-av"
import { Text } from "react-native"
import React, { useEffect, useState } from "react"

import theme from "../../../../theme"
import { Message } from "../../../../domain/entities/message"
import { SoundStateIcon, TapArea, Container, LoadingFeedback, Dashes } from "./styles"

enum AudioState {
    PAUSED = "play",
    PLAYING = "pause",
}

interface Props {
    message: Message
}

export default function RenderAudio({ message }: Props) {
    const [isLoaderVisible, displayLoaderFeedback] = useState(false)
    const [audioBuffer, updateAudioBuffer] = useState<Audio.Sound | undefined>()
    const [audioBufferState, updateAudioBufferState] = useState<AudioState>(AudioState.PAUSED)

    const isSender = message.isSender
    const isPlaying = audioBufferState === AudioState.PLAYING
    const loadingIndicatorColor = isSender ? theme.COLORS.white : theme.COLORS.chatUnlessAdminMessage

    async function handleAudioReprodution(): Promise<void> {
        try {
            console.log("reproduzindo mensagem de áudio...")
            displayLoaderFeedback(true)

            if (audioBuffer) {
                const bufferStatus = await audioBuffer?.getStatusAsync()
                bufferStatus.isLoaded && bufferStatus.isPlaying
                    ? await audioBuffer?.pauseAsync()
                    : await audioBuffer?.playAsync()

                updateAudioBufferState(isPlaying ? AudioState.PAUSED : AudioState.PLAYING)
                return
            }

            const { sound } = await Audio.Sound.createAsync({ uri: message.attachment.uri })
            updateAudioBuffer(sound)
            await sound.playAsync()

            sound.setOnPlaybackStatusUpdate((buffer) => {
                if (buffer.isLoaded && (buffer.isPlaying || buffer.isBuffering)) {
                    updateAudioBufferState(AudioState.PLAYING)
                    return
                }

                console.log("pausando mensagem de áudio...")
                updateAudioBufferState(AudioState.PAUSED)
                updateAudioBuffer(undefined)
            })
        }

        catch (error) {
            console.error(`houve um problema ao reproduzir o áudio ${error}`)
            updateAudioBufferState(AudioState.PAUSED)
            updateAudioBuffer(undefined)
        }

        finally {
            displayLoaderFeedback(false)
        }
    }

    useEffect(() => {
        return audioBuffer ? () => {
            audioBuffer?.unloadAsync()
        } : undefined
    }, [audioBuffer])

    return (
        <Container isSender={isSender}>
            <TapArea onPress={() => handleAudioReprodution()} isSender={isSender} disabled={isLoaderVisible}>
                <SoundStateIcon isSender={isSender} name={audioBufferState} isVisible={!isLoaderVisible} />
                <LoadingFeedback color={loadingIndicatorColor} isSender={isSender} isVisible={isLoaderVisible} />
            </TapArea>

            <Dashes isSender={isSender}>
                -------------------
            </Dashes>
        </Container>
    )
}