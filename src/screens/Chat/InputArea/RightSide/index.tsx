import { Animated } from 'react-native';
import React, { memo, useEffect } from 'react';

import { styles } from './styles';
import { SendButton } from './SenButton';
import { useViewModel } from './viewModel';
import { PaperclipButton } from './PaperclipButton';
import { RecordAudioButton } from './RecordAudioButton';

interface Props {
  onSend: () => void;
  isPaperClipDisplayed: boolean;
}

const RightSide = ({ onSend, isPaperClipDisplayed }: Props) => {
  const {
    increaseIn,
    increaseOut,
    widthAnimation,
    paperClipOpacity,
    openAttachmentModal,
  } = useViewModel();

  useEffect(() => {  
    isPaperClipDisplayed ? increaseIn() : increaseOut();
    return () => increaseOut();
  }, [isPaperClipDisplayed]);

  return (
    <Animated.View style={[ styles.rootArea, { width: widthAnimation } ]}>
      <PaperclipButton
        isVisible={isPaperClipDisplayed}
        contentOpacity={paperClipOpacity}
        onPaperclipPress={openAttachmentModal}
      />

      <RecordAudioButton isVisible={isPaperClipDisplayed} />
      <SendButton isVisible={!isPaperClipDisplayed} onSendPress={onSend} />
    </Animated.View>
  );
}

export default memo(RightSide);
