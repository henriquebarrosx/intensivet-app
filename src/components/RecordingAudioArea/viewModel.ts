import { useContext, useState } from "react";
import { Message } from "../../schemas/Message";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { useVetCase } from "../../context/VetCaseContext";
import { useAudioRecord } from "../../context/RecordAudio";
import { sendFileMessage } from "../../services/network/chat";
import { removeDuplicatedKeysFromMessage } from "../../utils/message";

export const useViewModel = () => {
    const { userData } = useContext(UserContext);
    const { id: vetCaseId } = useVetCase().vetCase;
    const { audioRecord, displayAudioRecordFeedback, setAudioRecord } = useAudioRecord();
    const { setMessages, virtualizedListRef, displaySendFeedback } = useContext(ChatContext);

    const [stopwatchSeconds, setStopwatchSeconds] = useState(0);

    const handleStopWatchCallback = () => {
        setStopwatchSeconds((prevValue) => prevValue + 1);
    }

    const formattedStopWatch = (): string => {
        const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
        const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    const onSend = async (): Promise<void> => {
        const accessToken = userData?.current_account?.access_token;
        const assetFile = await audioRecord.stop()

        displayAudioRecordFeedback(false)
        displaySendFeedback(true)
        setAudioRecord()

        try {
            const response = await sendFileMessage({
                vetCaseId,
                accessToken,
                file: assetFile,
                onDownloadProgress: () => { },
            });

            setMessages((prevMessages: Message[]) =>
                removeDuplicatedKeysFromMessage([response, ...prevMessages])
            );

            virtualizedListRef?.current?.scrollToIndex({ index: 0 });
        }

        catch (error) {
            console.error(error);
            console.error('There was an error after tries to upload a recorded audio');
        }

        finally {
            displaySendFeedback(false);
        }
    }

    const onCancel = async (): Promise<void> => {
        await audioRecord.cancel()
        displayAudioRecordFeedback(false)
        setAudioRecord(undefined)
    }

    return {
        onSend,
        onCancel,
        stopwatchSeconds,
        handleStopWatchCallback,
        formattedStopWatch: formattedStopWatch()
    }
}