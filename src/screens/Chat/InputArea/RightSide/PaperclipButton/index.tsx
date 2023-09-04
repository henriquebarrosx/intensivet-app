import React from 'react';
import { Animated } from 'react-native';

import { PaperclipIcon, TapArea } from './styles';

interface Props {
  isVisible: boolean;
  onPaperclipPress: () => void;
  contentOpacity: Animated.Value;
}

export function PaperclipButton({ isVisible, onPaperclipPress, contentOpacity }: Props) {
  if (isVisible) {
    return (
      <Animated.View style={{ opacity: contentOpacity }}>
        <TapArea onPress={onPaperclipPress}>
          <PaperclipIcon />
        </TapArea>
      </Animated.View>
    )
  }

  return null;
}
