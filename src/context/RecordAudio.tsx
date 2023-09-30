import React, { createContext, useContext, useEffect, useState } from "react"

import { logger } from "../infra/adapters"
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

    const errorMessage = "useAudioRecord should be nested in AudioRecordProvider"
    logger.error("REACT CONTEXT PROVIDER", errorMessage)
    throw new Error(errorMessage)
}