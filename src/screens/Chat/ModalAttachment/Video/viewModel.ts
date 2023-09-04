import { useContext } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Message } from "../../../../schemas/Message";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import { useVetCase } from "../../../../context/VetCaseContext";
import { useVetCases } from "../../../../context/VetCasesContext";
import { sendFileMessage } from "../../../../services/network/chat";
import { removeDuplicatedKeysFromMessage } from "../../../../utils/message";
import { FileAttachmentModalContext } from "../../../../context/AttachModal";
import { requestCameraPermission } from "../../../../utils/permissions/camera";
import { requestCameraMicrophonePermission } from "../../../../utils/permissions/microphone";
import { requestMediaLibraryPermission } from "../../../../utils/permissions/mediaLibrary";
import { DeviceFile } from "../../../../Entities/DeviceFile";

export const useViewModel = () => {
    const navigation = useNavigation();
    const { updateVetCaseList } = useVetCases();
    const chatContext = useContext(ChatContext);
    const { userData } = useContext(UserContext);
    const { id: vetCaseId } = useVetCase().vetCase;
    const { displayModal } = useContext(FileAttachmentModalContext);

    const recordVideo = async (): Promise<void> => {
        const hasCameraPermission = await requestCameraPermission();
        const hasMicrophonePermission = await requestCameraMicrophonePermission();
        const hasMediaLibraryPermission = await requestMediaLibraryPermission();

        if (hasCameraPermission && hasMicrophonePermission && hasMediaLibraryPermission) {
            displayModal(false);
            navigation.navigate('VideoCamera');
            return;
        }

        Alert.alert(
            'Permissão negada!',
            'Para que seja possível gravar vídeos é necessário permitir o acesso a câmera, microfone e mídia do dispositivo'
        );
    }

    const handleRecordedVideo = async (assetMediaUri: string) => {
        const accessToken = userData?.current_account?.access_token;
        chatContext.displaySendFeedback(true)

        try {
            const assetFileName = assetMediaUri.split("/").pop()
            const deviceFile = DeviceFile.create(assetFileName, "video", assetMediaUri)

            const response = await sendFileMessage({
                vetCaseId,
                accessToken,
                file: deviceFile,
                onDownloadProgress: () => chatContext.displaySendFeedback(false),
            });

            chatContext.setMessages((prevMessages: Message[]) =>
                removeDuplicatedKeysFromMessage([response, ...prevMessages])
            );

            /* Remove route params to avoid any unexpected side effect */
            navigation.setParams({ videoUri: '' });
            chatContext.virtualizedListRef?.current?.scrollToIndex({ index: 0 });

            updateVetCaseList(response);
        }

        catch (error) {
            console.error(error);
            console.error('There was an error after tries to upload a image from gallery');
        }

        finally {
            chatContext.displaySendFeedback(false);
        }
    }

    return { recordVideo, handleRecordedVideo };
}