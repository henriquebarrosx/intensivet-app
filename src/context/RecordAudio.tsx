import React, { createContext, useContext, useEffect, useState } from "react"

import { WithChildren } from "../@types/common"
import { AudioRecordAdapter } from "../infra/adapters/audio-record"

interface ContextSchema {
    isRecordingAudio: boolean
    audioRecord: AudioRecordAdapter | undefined
    displayAudioRecordFeedback(isRecording: boolean): void
    setAudioRecord(record?: AudioRecordAdapter): void
}

const AudioRecordContext = createContext(null)

export const AudioRecordProvider = ({ children }: WithChildren) => {
    const [isRecordingAudio, displayAudioRecordFeedback] = useState(false)
    const [audioRecord, setAudioRecord] = useState<AudioRecordAdapter | undefined>()

    useEffect(() => {
        return () => { audioRecord?.cancel() }
    }, [])

    return (
        <AudioRecordContext.Provider
            value={{
                audioRecord,
                isRecordingAudio,
                setAudioRecord,
                displayAudioRecordFeedback,
            }}>
            {children}
        </AudioRecordContext.Provider>
    )
}

export const useAudioRecord = (): ContextSchema => {
    const context = useContext(AudioRecordContext)

    if (context) {
        return context
    }

    throw new Error("O uso do hook useAudioRecord só é válido quando abraçado pelo AudioRecordProvider")
}