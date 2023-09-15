import { Audio, AVPlaybackStatus } from 'expo-av';
import React, { memo, useEffect, useState } from "react";

import theme from '../../../../theme';
import { GroupPlayingFeedback } from './GroupPlayingFeedback';
import { Message } from '../../../../domain/entities/message';
import { SoundStateIcon, TapArea, Container, LoadingFeedback } from './styles';

enum AudioState {
    PAUSED = 'play',
    PLAYING = 'pause',
}

interface Props {
    message: Message;
}

function RenderAudio({ message }: Props) {
    const isSender = message.isSender;

    const [isLoading, setLoading] = useState(false);
    const [sound, setAudioBuffer] = useState<Audio.Sound | undefined>();
    const [soundStateIcon, setSoundStateIcon] = useState<AudioState>(AudioState.PAUSED);

    async function isBeingPlayed(): Promise<boolean> {
        const audioBuffer = await sound?.getStatusAsync();
        return audioBuffer?.isLoaded && audioBuffer.isPlaying || false
    }

    async function pauseAudioBuffer(): Promise<void> {
        await sound?.pauseAsync();
    }

    async function playAudioBuffer(): Promise<void> {
        await sound?.playAsync();
    }

    async function handleAudioIcon(): Promise<void> {
        const isPlaying = await isBeingPlayed();
        const icon = isPlaying ? AudioState.PAUSED : AudioState.PLAYING;

        setSoundStateIcon(icon);
    }

    async function handleSoundInTracker(): Promise<void> {
        if (sound) {
            const isPlaying: boolean = soundStateIcon === AudioState.PLAYING;
            isPlaying ? await pauseAudioBuffer() : await playAudioBuffer();
            await handleAudioIcon();
            return;
        }

        await playAudioMessage();
    }

    async function playAudioMessage(): Promise<void> {
        const { sound } = await Audio.Sound.createAsync({ uri: message.file.uri });
        await sound.playAsync();

        setAudioBuffer(sound);
        sound.setOnPlaybackStatusUpdate(audioStateListener)
    }

    function audioStateListener(audioMessage: AVPlaybackStatus): void {
        if (audioMessage?.isLoaded && (audioMessage.isPlaying || audioMessage.isBuffering)) {
            setSoundStateIcon(AudioState.PLAYING);
            return;
        }

        setAudioBuffer(undefined);
        setSoundStateIcon(AudioState.PAUSED);
    }

    async function handleAudioReprodution(): Promise<void> {
        try {
            setLoading(true);
            await handleSoundInTracker();
            setLoading(false);
            return;
        }

        catch {
            setAudioBuffer(undefined);
            setSoundStateIcon(AudioState.PAUSED);
        }
    }

    function getLoadingIndicatorColor(): string {
        return isSender ? theme.COLORS.white : theme.COLORS.gray;
    }

    const isPlaying = soundStateIcon === AudioState.PLAYING

    useEffect(() => {
        return () => {
            sound?.unloadAsync();
        }
    }, [sound]);

    return (
        <Container isSender={isSender}>
            <TapArea onPress={handleAudioReprodution} isSender={isSender} disabled={isLoading}>
                <SoundStateIcon isSender={isSender} name={soundStateIcon} isVisible={!isLoading} />
                <LoadingFeedback color={getLoadingIndicatorColor()} isSender={isSender} isVisible={isLoading} />
            </TapArea>

            <GroupPlayingFeedback
                isPlaying={isPlaying}
                shouldDisplayWhiteLayout={message.isSender}
            />
        </Container>
    );
}

export default memo(RenderAudio);
