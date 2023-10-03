import { VirtualizedList } from "react-native"
import { RefObject, useRef, useState } from "react"

import { Pagination } from "../../../@types/common"
import { MessageModel } from "../../../schemas/Message"
import { useServices } from "../../../context/ServicesContext"
import { VetCaseModel, VetCaseOrderTypeEnum } from "../../../schemas/VetCase"

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
        vetCases.forEach((vetCase) => items.set(vetCase.id, vetCase))
        return Array.from(items.values())
    }

    async function paginate(): Promise<void> {
        if (pagination?.next) {
            await findAll(pagination.next)
        }
    }

    async function readMessages(id: number): Promise<void> {
        const items = new Map<number, VetCaseModel>()

        function addOnBegining(vetCases: VetCaseModel[]) {
            const vetCase = vetCases.find((item) => item.id === id)
            items.set(vetCase.id, { ...vetCase, unread_updates: 0, unread_messages: 0 })
        }

        function appendOtherMessages(vetCases: VetCaseModel[]) {
            vetCases.forEach((vetCase) => {
                if (id === vetCase.id) return
                items.set(vetCase.id, vetCase)
            })
        }

        updateItems((vetCases) => {
            addOnBegining(vetCases)
            appendOtherMessages(vetCases)
            return Array.from(items.values())
        })

        await vetCaseService.readMessages(id)
    }

    function receiveMessage(message: MessageModel, isRead: boolean = false): void {
        const items = new Map<number, VetCaseModel>()

        function addOnBegining(data: VetCaseModel[]) {
            const vetCase = data.find((item) => item.id === message.vet_case_id)

            items.set(vetCase.id, {
                ...vetCase,
                last_message: {
                    message: message.message,
                    file_name: message?.file_name,
                    created_at: message.created_at,
                    message_type: message.message_type,
                },
                unread_updates: isRead ? 0 : vetCase.unread_updates += 1,
                unread_messages: isRead ? 0 : vetCase.unread_messages += 1,
            })
        }

        function appendOtherMessages(data: VetCaseModel[]) {
            data.forEach((vetCase) => {
                if (items.has(vetCase.id)) return
                items.set(vetCase.id, vetCase)
            })
        }

        updateItems((vetCases) => {
            addOnBegining(vetCases)
            appendOtherMessages(vetCases)
            return Array.from(items.values())
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