import React from 'react';

import { SendIcon, TapArea } from './styles';

interface Props {
  isVisible: boolean;
  onSendPress: () => void;
}

export function SendButton({ isVisible, onSendPress }: Props) {
  if (isVisible) {
    return (
      <TapArea onPress={onSendPress}>
        <SendIcon />
      </TapArea>
    )
  }

  return null;
}
