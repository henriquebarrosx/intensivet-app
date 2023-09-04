import { Audio } from 'expo-av';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { WithChildren } from '../@types/common';

interface ContextSchema {
  isRecording: boolean;
  recording: Audio.Recording| undefined;
  recordAudio: Dispatch<SetStateAction<boolean>>;
  setRecording: Dispatch<SetStateAction<Audio.Recording| undefined>>;
}

const AudioRecordContext = createContext({} as ContextSchema);

export const AudioRecordProvider = ({children}: WithChildren) => {
  const [isRecording, recordAudio] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording| undefined>();

  return (
    <AudioRecordContext.Provider
      value={{
        recording,
        isRecording,
        recordAudio,
        setRecording,
      }}>
      {children}
    </AudioRecordContext.Provider>
  )
}

export const useAudioRecord = (): ContextSchema => {
  const context = useContext(AudioRecordContext);

  if (context) {
    return context;
  }

  throw new Error('O uso do hook useAudioRecord só é válido quando abraçado pelo AudioRecordProvider')
}