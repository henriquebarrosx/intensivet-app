import { VirtualizedList } from "react-native"
import { RefObject, useRef, useState } from "react"

import { Pagination } from "../../../@types/common"
import { Message } from "../../../domain/entities/message"
import { useVetCase } from "../../../context/VetCaseContext"
import { useServices } from "../../../context/ServicesContext"
import { DeviceFile } from "../../../domain/entities/device-file"

export function useVetCaseMessages(): IVetCaseMessagesContext {
    const vetCaseContext = useVetCase()
    const { messageService } = useServices()

    const listViewRef = useRef<VirtualizedList<Message>>(null)
    const [items, updateItems] = useState<Message[]>([])
    const [pagination, updatePagination] = useState<Pagination | null>(null)
    const [isSending, displaySendFeedback] = useState(false)
    const [isFetching, displayFetchLoader] = useState(false)
    const isNotEmpty = items.length > 0

    async function findAll(fromPage: number = 1, stopLoadingWhenFinish: boolean = true) {
        try {
            displayFetchLoader(true)

            const [messages, pagination] = await messageService
                .findAllByVetCase(
                    vetCaseContext.data.id,
                    fromPage
                )

            const hasbeenPaginated = fromPage > 1
            const nonDuplicatedMessages = hasbeenPaginated
                ? removeDuplicatedKeysFromMessage([...items, ...messages])
                : messages

            updatePagination(pagination)
            updateItems(nonDuplicatedMessages)
        }

        finally {
            if (stopLoadingWhenFinish) displayFetchLoader(false)
        }
    }

    async function findOne(messageId: number): Promise<void> {
        try {
            displayFetchLoader(true)

            const message = await messageService
                .findOneByVetCase(
                    vetCaseContext.data.id,
                    messageId
                )

            add(message)
            updatePagination(pagination)
        }

        finally {
            displayFetchLoader(false)
        }
    }

    async function sendFile(file: DeviceFile): Promise<Message> {
        try {
            displaySendFeedback(true)

            const message = await messageService.create(
                vetCaseContext.data.id,
                { file },
                () => displaySendFeedback(false)
            )

            add(message)
            scrollToBottom()
            return message
        }

        finally {
            displaySendFeedback(false)
        }
    }

    async function sendText(content: string): Promise<Message> {
        try {
            displaySendFeedback(true)

            const message = await messageService.create(
                vetCaseContext.data.id,
                { message: content },
                () => displaySendFeedback(false)
            )

            add(message)
            scrollToBottom()
            return message
        }

        finally {
            displaySendFeedback(false)
        }
    }

    function removeDuplicatedKeysFromMessage(messages: Message[]): Message[] {
        const items = new Map<number, Message>()

        messages.forEach(
            (message) => items.set(message.id, message)
        )

        return Array.from(items.values())
    }

    function add(message: Message): void {
        updateItems((data) => removeDuplicatedKeysFromMessage([message, ...data]))
    }

    function scrollToBottom(): void {
        listViewRef?.current?.scrollToIndex({ index: 0 })
    }

    async function paginate(): Promise<void> {
        if (pagination?.next) {
            await findAll(pagination.next)
        }
    }

    function reset(): void {
        updateItems([])
        updatePagination(null)
    }

    return {
        items,
        isSending,
        isFetching,
        isNotEmpty,
        listViewRef,
        findAll,
        findOne,
        sendFile,
        sendText,
        add,
        scrollToBottom,
        paginate,
        reset,
    }
}

export type IVetCaseMessagesContext = {
    items: Message[]
    isSending: boolean
    isFetching: boolean
    isNotEmpty: boolean
    listViewRef: RefObject<VirtualizedList<Message>>
    findAll(fromPage?: number, stopLoadingWhenFinish?: boolean): Promise<void>
    findOne(messageId: number): Promise<void>
    sendFile(file: DeviceFile): Promise<Message>
    sendText(text: string): Promise<Message>
    add(message: Message): void
    scrollToBottom(): void
    paginate(): void
    reset(): void
}