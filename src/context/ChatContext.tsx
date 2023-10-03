import { VirtualizedList } from "react-native"
import React, { useRef, useState, useContext, createContext, RefObject } from "react"

import { useVetCase } from "./VetCaseContext"
import { WithChildren } from "../@types/common"
import { useServices } from "./ServicesContext"
import { MessageModel } from "../schemas/Message"
import { Pagination } from "../schemas/Pagination"
import { Message } from "../domain/entities/message"
import { logger } from "../infra/adapters/logger-adapter"
import { MessageMapper } from "../infra/mappers/message-mapper"
import { removeDuplicatedKeysFromMessage } from "../utils/message"

type ChatContextGateway = {
    isSending: boolean
    isFetching: boolean
    messages: Message[]
    virtualizedListRef: RefObject<VirtualizedList<Message>>
    cleanChat(): void
    scrollToBottom(): void
    handlePagination(): void
    displaySendFeedback(isSending: boolean): void
    displayFetchLoader(isFetching: boolean): void
    insertMessage(message: Message): Promise<void>
    fetchMessage(messageId: number): Promise<void>
    receiveNewMessage(message: MessageModel): void
    fetchMessages(fromPage?: number, stopLoadingWhenFinish?: boolean): Promise<void>
}

export const ChatContext = createContext<ChatContextGateway>(null)

export function ChatProvider({ children }: WithChildren) {
    const { vetCase } = useVetCase()
    const { messageService } = useServices()

    const [isSending, displaySendFeedback] = useState(false)
    const [isFetching, displayFetchLoader] = useState(false)
    const [messages, updateMessageList] = useState<Message[]>([])
    const [pagination, updatePagination] = useState<Pagination | null>(null)
    const virtualizedListRef = useRef<VirtualizedList<Message>>(null)

    function receiveNewMessage(message: MessageModel): void {
        const items = removeDuplicatedKeysFromMessage([...messages, MessageMapper.apply(message)])
        updateMessageList(items)
    }

    async function fetchMessages(fromPage: number = 1, stopLoadingWhenFinish: boolean = true) {
        try {
            displayFetchLoader(true)

            const [items, pagination] = await messageService.findAllByVetCase(vetCase.id, fromPage)

            const hasbeenPaginated = fromPage > 1
            const nonDuplicatedMessages = hasbeenPaginated
                ? removeDuplicatedKeysFromMessage([...messages, ...items])
                : items

            updatePagination(pagination)
            updateMessageList(nonDuplicatedMessages)
        }

        finally {
            if (stopLoadingWhenFinish) displayFetchLoader(false)
        }
    }

    async function fetchMessage(messageId: number): Promise<void> {
        try {
            displayFetchLoader(true)

            const message = await messageService.findOneByVetCase(vetCase.id, messageId)
            const nonDuplicatedMessages = removeDuplicatedKeysFromMessage([message, ...messages])

            updatePagination(pagination)
            updateMessageList(nonDuplicatedMessages)
        }

        finally {
            displayFetchLoader(false)
        }
    }

    async function insertMessage(message: Message): Promise<void> {
        const nonDuplicatedMessages = removeDuplicatedKeysFromMessage([message, ...messages])
        updateMessageList(() => nonDuplicatedMessages)
    }

    async function handlePagination(): Promise<void> {
        if (pagination?.next) {
            await fetchMessages(pagination.next)
        }
    }

    function cleanChat(): void {
        updateMessageList([])
        updatePagination(null)
    }

    function scrollToBottom(): void {
        virtualizedListRef?.current?.scrollToIndex({ index: 0 })
    }

    return (
        <ChatContext.Provider
            value={{
                messages,
                isSending,
                isFetching,
                virtualizedListRef,
                cleanChat,
                fetchMessage,
                fetchMessages,
                insertMessage,
                scrollToBottom,
                handlePagination,
                receiveNewMessage,
                displayFetchLoader,
                displaySendFeedback,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)

    if (!context) {
        const errorMessage = "useChat must to be nested in ChatProvider"
        logger.error("REACT CONTEXT PROVIDER", errorMessage)
        throw new Error(errorMessage)
    }

    return context
}