import React from 'react';
import theme from '../../../../../../theme';
import { Container, PlayingIndicator } from './styles';

interface Props {
  isPlaying: boolean;
  shouldDisplayWhiteLayout: boolean;
}

export function GroupPlayingFeedback({ isPlaying, shouldDisplayWhiteLayout }: Props) {
  function getLayoutColor(): string {
    return shouldDisplayWhiteLayout ? theme.COLORS.white : theme.COLORS.gray;
  }

  return (
    <Container>
      <PlayingIndicator animating={isPlaying} color={getLayoutColor()} />
      <PlayingIndicator animating={isPlaying} style={{ left: 22 }} color={getLayoutColor()} />
      <PlayingIndicator animating={isPlaying} style={{ left: 44 }} color={getLayoutColor()} />
      <PlayingIndicator animating={isPlaying} style={{ left: 66 }} color={getLayoutColor()} />
    </Container>
  )
}