import mime from 'mime';
import { useContext } from 'react';
import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { Message } from '../../../../schemas/Message';
import { ChatContext } from '../../../../context/ChatContext';
import { UserContext } from '../../../../context/UserContext';
import { useVetCase } from '../../../../context/VetCaseContext';
import { useVetCases } from '../../../../context/VetCasesContext';
import { sendFileMessage } from '../../../../services/network/chat';
import { FileTypes, UploadFileSchema } from "../../../../@types/common";
import { removeDuplicatedKeysFromMessage } from '../../../../utils/message';
import { FileAttachmentModalContext } from '../../../../context/AttachModal';
import { requestMediaLibraryPermission } from "../../../../utils/permissions/mediaLibrary";

export const useViewModel = () => {
    const { updateVetCaseList } = useVetCases();
    const { userData } = useContext(UserContext);
    const { id: vetCaseId } = useVetCase().vetCase;
    const { displayModal } = useContext(FileAttachmentModalContext);
    const { setMessages, virtualizedListRef, displaySendFeedback } = useContext(ChatContext);

    const uploadDocumentFile = async () => {
        const documentFile = await getDocumentFromDevice();
        const accessToken = userData?.current_account?.access_token;

        displayModal(false);

        try {
            if (documentFile) {
                displaySendFeedback(true);

                const response = await sendFileMessage({
                    vetCaseId,
                    accessToken,
                    file: mountFileSchema(documentFile),
                    fileType: getAttachmentType(documentFile.mimeType!),
                    onDownloadProgress: () => displaySendFeedback(false),
                });

                setMessages((prevMessages: Message[]) => {
                    return removeDuplicatedKeysFromMessage([response, ...prevMessages]);
                });

                updateVetCaseList(response);
            }
        }

        catch (error) {
            console.error('Upload media from gallery fails', error);
        }

        finally {
            virtualizedListRef?.current?.scrollToIndex({ index: 0 });
            displaySendFeedback(false);
        }
    };

    return { uploadDocumentFile };
}

async function getDocumentFromDevice(): Promise<DocumentPicker.DocumentPickerAsset | undefined> {
    if (await requestMediaLibraryPermission()) {
        const response = await DocumentPicker.getDocumentAsync();

        if (response.canceled) return

        const documentFile = response.assets[0]
        return documentFile
    }

    getDocumentFromDevice();
}

/*
  A biblioteca de selecionador de documentos do Expo não retorna uma URL válida.
  Sendo assim, é preciso realizar uma formatação para que ela possa ser utilizada
  para realizar o upload.

  Link da solução: https://issueexplorer.com/issue/expo/expo/14513.
*/
// export const fileUri = (doc: NonNullable<DocumentPicker.DocumentResult>): string => {
//     if (doc.type === UploadStatus.SUCCESS) {
//         return Platform.OS === 'android' ? `file://${doc.uri}`.replace(/%/g, '%25') : doc.uri;
//     }

//     return doc.type;
// };

const mountFileSchema = (documentFile: DocumentPicker.DocumentPickerAsset): UploadFileSchema => {
    return {
        uri: documentFile.uri,
        name: documentFile.name,
        type: mime.getType(documentFile.uri)! as 'image' | 'video',
    }
}

const getAttachmentType = (attachmentType: string): FileTypes => {
    const isImageFile = attachmentType?.startsWith('image/');
    const isVideoFile = attachmentType?.startsWith('video/');
    const isAudioFile = attachmentType?.startsWith('audio/');

    const scenarios = [
        {
            match: isImageFile,
            fileType: 'image'
        },
        {
            match: isVideoFile,
            fileType: 'video'
        },
        {
            match: isAudioFile,
            fileType: 'audio'
        },
        {
            match: !isVideoFile || !isImageFile,
            fileType: 'file'
        },
    ]

    return scenarios.find(scenario => !!scenario.match)?.fileType! as FileTypes;
};
