import * as ImagePicker from "expo-image-picker";

import { Message } from '../schemas/Message';
import { VetCase } from '../schemas/VetCase';
import { UploadDocType, UploadFileSchema } from '../@types/common';

/*
  Observation: FormData already apply string format to fields.
  Convert those fields to string can generate bad promise call!
*/

type FileUpload = ImagePicker.ImagePickerResult | UploadDocType | UploadFileSchema;

export const formatFileMessage = (file: FileUpload, vetCaseId: number, type: string = 'image'): FormData => {
    const formData = new FormData();

    // @ts-ignore
    formData.append('vet_case_message[file]', file);
    formData.append('vet_case_message[message_type]', type);
    // @ts-ignore
    formData.append('vet_case_message[vet_case_id]', vetCaseId);

    return formData;
};

export const removeDuplicatedKeysFromMessage = (messages: Message[]): Message[] => {
    const items = new Map<number, Message>()

    messages.forEach((message) => {
        items.set(message.id, message)
    })

    return Array.from(items.values())
}

export const removeDuplicatedKeysFromCases = (vetCases: VetCase[]): VetCase[] => {
    const items = new Map<number, VetCase>()

    vetCases.forEach((vetCase) => {
        items.set(vetCase.id, vetCase)
    })

    return Array.from(items.values())
}