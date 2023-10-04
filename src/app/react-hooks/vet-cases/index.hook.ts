import { VirtualizedList } from "react-native"
import { RefObject, useRef, useState } from "react"

import { Pagination } from "../../../@types/common"
import { MessageModel } from "../../../schemas/Message"
import { useServices } from "../../../context/ServicesContext"
import { LastMessage, VetCaseModel, VetCaseOrderTypeEnum } from "../../../schemas/VetCase"

export function useVetCases(): IVetCasesContext {
    const { vetCaseService } = useServices()

    const [items, updateItems] = useState<VetCaseModel[]>([])
    const [isLoading, displayLoader] = useState<boolean>(true)
    const listViewRef = useRef<VirtualizedList<VetCaseModel>>(null)
    const [pagination, updatePagination] = useState<Pagination | null>(null)
    const [orderedBy, updatedItemsOrderBy] = useState<VetCaseOrderTypeEnum>(VetCaseOrderTypeEnum.LAST_MESSAGE);

    function add(item: VetCaseModel): void {
        updateItems((data) => [item, ...data])
    }

    function reset(): void {
        updateItems([])
        updatePagination(null)
        updatedItemsOrderBy(VetCaseOrderTypeEnum.LAST_MESSAGE)
    }

    async function findAll(page = 1, orderBy = VetCaseOrderTypeEnum.LAST_MESSAGE): Promise<void> {
        try {
            displayLoader(true)
            const [data, pagination] = await vetCaseService.findAll(page, orderBy)

            const hasBeenPaginated = page > 1
            const nonDuplicatedItems = hasBeenPaginated
                ? removeDuplicatedKeysFromCases([...items, ...data])
                : data

            updateItems(nonDuplicatedItems)
            updatePagination(pagination)
        }

        finally {
            displayLoader(false)
        }
    }

    function removeDuplicatedKeysFromCases(vetCases: VetCaseModel[]): VetCaseModel[] {
        const items = new Map<number, VetCaseModel>()

        vetCases.forEach(
            (vetCase) => items.set(vetCase.id, vetCase)
        )

        return Array.from(items.values())
    }

    async function paginate(): Promise<void> {
        if (pagination?.next) {
            await findAll(pagination.next)
        }
    }

    async function readMessages(vetCaseId: number): Promise<void> {
        function readVetCaseMessages(vetCases: VetCaseModel[]) {
            const items = new Map<number, VetCaseModel>()

            vetCases.forEach((vetCase) => {
                if (vetCase.id === vetCaseId) {
                    const readMessages = { ...vetCase, unread_updates: 0, unread_messages: 0 }
                    items.set(vetCaseId, readMessages)
                    return
                }

                items.set(vetCase.id, vetCase)
            })

            return Array.from(items.values())
        }

        updateItems(readVetCaseMessages)
        await vetCaseService.readMessages(vetCaseId)
    }

    function receiveMessage(message: MessageModel, isRead: boolean = false): void {
        const chats = new Map<number, VetCaseModel>()

        updateItems((data) => {
            const chatById = data.find((item) => item.id === message.vet_case_id)
            const updatedUnreadMessages = isRead ? 0 : chatById.unread_messages += 1

            const lastMessage: LastMessage = {
                message: message.message,
                file_name: message?.file_name,
                created_at: message.created_at,
                message_type: message.message_type,
            }

            chats.set(chatById.id, {
                ...chatById,
                last_message: lastMessage,
                unread_messages: updatedUnreadMessages,
            })

            data.forEach((vetCase) => {
                if (chats.has(vetCase.id)) return
                chats.set(vetCase.id, vetCase)
            })

            return Array.from(chats.values())
        })
    }

    async function orderByLastMessage(): Promise<void> {
        updatedItemsOrderBy(VetCaseOrderTypeEnum.LAST_MESSAGE)
        await findAll(1, VetCaseOrderTypeEnum.LAST_MESSAGE)
    }

    async function orderBySla(): Promise<void> {
        updatedItemsOrderBy(VetCaseOrderTypeEnum.SLA)
        await findAll(1, VetCaseOrderTypeEnum.SLA)
    }

    function scrollToBottom(): void {
        listViewRef?.current?.scrollToIndex({ index: 0 })
    }

    return {
        items,
        isLoading,
        orderedBy,
        listViewRef,
        isOrderedBySla: orderedBy === VetCaseOrderTypeEnum.SLA,
        isOrderedByLastMessage: orderedBy === VetCaseOrderTypeEnum.LAST_MESSAGE,
        add,
        findAll,
        paginate,
        reset,
        readMessages,
        receiveMessage,
        orderByLastMessage,
        orderBySla,
        scrollToBottom,
    }
}

export type IVetCasesContext = {
    items: VetCaseModel[]
    isLoading: boolean
    isOrderedBySla: boolean
    isOrderedByLastMessage: boolean
    orderedBy: VetCaseOrderTypeEnum
    listViewRef: RefObject<VirtualizedList<VetCaseModel>> | undefined
    add(item: VetCaseModel): void
    findAll(page?: number, orderBy?: VetCaseOrderTypeEnum): Promise<void>
    paginate(): Promise<void>
    reset(): void
    readMessages(id: number): Promise<void>
    receiveMessage(message: MessageModel, isRead?: boolean): void
    orderByLastMessage(): Promise<void>
    orderBySla(): Promise<void>
    scrollToBottom(): void
}