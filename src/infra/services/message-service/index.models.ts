import { MessageModel } from "../../../schemas/Message";
import { Pagination } from "../../../schemas/Pagination"

export type FindAllMessagesResponse = {
    pagination: Pagination;
    vet_case_messages: MessageModel[]
}