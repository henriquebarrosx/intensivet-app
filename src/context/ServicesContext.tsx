import { createContext, useContext } from "react"

import { logger } from "../infra/adapters/logger-adapter"
import { SessionRepository } from "../infra/repositories/session"
import { MessageService } from "../infra/services/message-service"
import { AccountService } from "../infra/services/account-service"
import { httpClient } from "../infra/adapters/http-client-adapter"
import { VetCaseService } from "../infra/services/vet-case-service"
import { pushNotification } from "../infra/adapters/push-notification"
import { NotificationService } from "../infra/services/notification-service"

type Props = {
    accountService: AccountService
    vetCaseService: VetCaseService
    messageService: MessageService
    notificationService: NotificationService
}

const ServicesContext = createContext<Props>(null)

function ServicesProvider({ children }) {
    const sessionRepository = new SessionRepository()

    const accountService = new AccountService(httpClient)
    const vetCaseService = new VetCaseService(httpClient)
    const messageService = new MessageService(httpClient)
    const notificationService = new NotificationService(httpClient, pushNotification, sessionRepository)

    return (
        <ServicesContext.Provider
            value={{
                accountService,
                vetCaseService,
                messageService,
                notificationService,
            }}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices() {
    const context = useContext(ServicesContext)

    if (context) return context

    logger.error("REACT CONTEXT PROVIDER", "useServices must to be nested in ServicesProvider")
    throw new Error("useServices must to be nested in ServicesProvider")
}

export function injectServices(Component: any) {
    return (props: any) => (
        <ServicesProvider>
            <Component {...props} />
        </ServicesProvider>
    )
}