import { VetCaseModel } from '../schemas/VetCase';
import { Message } from '../domain/entities/message';
import { DeviceFile } from "../domain/entities/device-file";

/*
  Observation: FormData already apply string format to fields.
  Convert those fields to string can generate bad promise call!
*/

export function formatFileMessage(file: DeviceFile, vetCaseId: number, kind: "image" | "audio" | "file" | "video"): FormData {
    const formData = new FormData();

    // @ts-ignore
    formData.append('vet_case_message[file]', { name: file.name, type: file.type, uri: file.uri });
    formData.append('vet_case_message[message_type]', kind);
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

export const removeDuplicatedKeysFromCases = (vetCases: VetCaseModel[]): VetCaseModel[] => {
    const items = new Map<number, VetCaseModel>()

    vetCases.forEach((vetCase) => {
        items.set(vetCase.id, vetCase)
    })

    return Array.from(items.values())
}