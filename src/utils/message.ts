import { VetCaseModel } from "../schemas/VetCase"
import { Message } from "../domain/entities/message"

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