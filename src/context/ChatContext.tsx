import { VirtualizedList } from 'react-native';

import React, {
    useRef,
    useState,
    RefObject,
    useContext,
    useCallback,
    createContext,
} from 'react';

import { UserContext } from './UserContext';
import { Message } from '../schemas/Message';
import { useVetCase } from './VetCaseContext';
import { WithChildren } from '../@types/common';
import { PaginationType } from '../schemas/Pagination';
import { removeDuplicatedKeysFromMessage } from '../utils/message';
import { fetchVetCaseMessage, fetchVetCaseMessages } from '../services/network/vetCaseMessage';

type FetchMessagesType = {
    page?: number;
    stopLoadingWhenFinish?: boolean;
}

interface ChatContextType {
    messages: Message[];
    setMessages: (initialState: Message[] | ((messages: Message[]) => Message[])) => void;
    isFetching: boolean;
    displayFetchFeedback: (isFetching: boolean) => void;
    isSending: boolean;
    displaySendFeedback: (isSending: boolean) => void;
    fetchMessage: (message: Message) => Promise<void>;
    fetchMessages: (params: FetchMessagesType) => void;
    onPaginate: () => void;
    restoreDefaultValues: () => void;
    virtualizedListRef: RefObject<VirtualizedList<Message>>;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatProvider({ children }: WithChildren) {
    const { vetCase } = useVetCase();
    const { userData } = useContext(UserContext);

    const [isSending, displaySendFeedback] = useState(false);
    const [isFetching, displayFetchFeedback] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
    const virtualizedListRef = useRef<VirtualizedList<Message>>(null);
    const [pagination, setPagination] = useState<PaginationType>({} as PaginationType);

    const accessToken = userData?.current_account?.access_token;

    const fetchMessages = async ({ stopLoadingWhenFinish = true, page = 1 }: FetchMessagesType) => {
        try {
            displayFetchFeedback(true);

            const { data } = await fetchVetCaseMessages({
                routeParams: { vetCaseId: vetCase?.id, page },
            });

            setMessages((prevMessages) => {
                return removeDuplicatedKeysFromMessage([...prevMessages, ...data.vet_case_messages]);
            });

            return data?.pagination && setPagination(data.pagination);
        }

        catch (error) {
            console.error('Houve um problema ao tentar buscar as mensagens');
            console.error(error);
        }

        finally {
            if (stopLoadingWhenFinish) {
                displayFetchFeedback(false);
            }
        }
    };

    const fetchMessage = async (message: Message) => {
        try {
            displayFetchFeedback(true);

            const { data } = await fetchVetCaseMessage({
                routeParams: { vetCaseId: vetCase?.id, messageId: message.id },
            });

            setMessages((prevMessages) => {
                return removeDuplicatedKeysFromMessage([data, ...prevMessages])
            });
        }

        catch (error) {
            console.error('Houve um problema ao tentar buscar a mensagem');
            console.error(error);
        }

        finally {
            displayFetchFeedback(false);
        }
    };

    const restoreDefaultValues = () => {
        setMessages([] as Message[]);
        setPagination({} as PaginationType);
    };

    async function onPaginate(): Promise<void> {
        if (!!pagination.next) {
            await fetchMessages({ page: pagination.next });
        }
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                onPaginate,
                setMessages,
                fetchMessage,
                fetchMessages,
                virtualizedListRef,
                restoreDefaultValues,
                isSending,
                displaySendFeedback,
                isFetching,
                displayFetchFeedback,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext)
    const isContextNotFound = Object.keys(context).length === 0

    if (isContextNotFound) {
        throw new Error("useChat should be nested in ChatProvider")
    }

    return context
}