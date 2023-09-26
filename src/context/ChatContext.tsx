import { VirtualizedList } from "react-native"
import React, { useRef, useState, useContext, createContext, RefObject } from "react"

import { useVetCase } from "./VetCaseContext"
import { WithChildren } from "../@types/common"
import { MessageModel } from "../schemas/Message"
import { Pagination } from "../schemas/Pagination"
import { Message } from "../domain/entities/message"
import { MessageMapper } from "../infra/mappers/message-mapper"
import { removeDuplicatedKeysFromMessage } from "../utils/message"
import { MessageService } from "../infra/services/message-service"
import { httpClient } from "../infra/adapters/http-client-adapter"

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

const INITIAL_PAGE = 1
export const ChatContext = createContext<ChatContextGateway>(null)

export function ChatProvider({ children }: WithChildren) {
    const { vetCase } = useVetCase()

    const messagesService = new MessageService(httpClient)

    const [isSending, displaySendFeedback] = useState(false)
    const [isFetching, displayFetchLoader] = useState(false)
    const [messages, updateMessageList] = useState<Message[]>([])
    const [pagination, updatePagination] = useState<Pagination | null>(null)
    const virtualizedListRef = useRef<VirtualizedList<Message>>(null)

    function receiveNewMessage(message: MessageModel): void {
        console.log("New message received: ", message)
        const items = removeDuplicatedKeysFromMessage([...messages, MessageMapper.apply(message)])
        updateMessageList(items)
    }

    async function fetchMessages(fromPage: number = 1, stopLoadingWhenFinish: boolean = true) {
        try {
            displayFetchLoader(true)

            console.log("[messages] fetching messages...")
            const [items, pagination] = await messagesService.findAllByVetCase(vetCase.id, fromPage)
            const nonDuplicatedMessages = removeDuplicatedKeysFromMessage([...messages, ...items])
            console.log(`[messages] found ${nonDuplicatedMessages.length} messages of ${pagination.total_count}`)

            updatePagination(pagination)
            updateMessageList(nonDuplicatedMessages)
        }

        catch (error) {
            console.error("[vet case messages] messages retrieval fails", error)
        }

        finally {
            if (stopLoadingWhenFinish) displayFetchLoader(false)
        }
    }

    async function fetchMessage(messageId: number): Promise<void> {
        try {
            displayFetchLoader(true)

            const message = await messagesService.findOneByVetCase(vetCase.id, messageId)
            const nonDuplicatedMessages = removeDuplicatedKeysFromMessage([message, ...messages])

            updatePagination(pagination)
            updateMessageList(nonDuplicatedMessages)
        }

        catch (error) {
            console.error("[vet case message] message retrieval fails", error)
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
            const currentPage = pagination?.current ?? INITIAL_PAGE
            const totalPage = pagination?.total_pages ?? INITIAL_PAGE
            console.log(`[messages] paginating ${currentPage} of ${totalPage}...`)
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
    if (!context) throw new Error("useChat should be nested in ChatProvider")
    return context
}