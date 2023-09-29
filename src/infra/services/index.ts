import { pushNotification } from "../adapters"
import { SessionRepository } from "../repositories/session"
import { httpClient } from "../adapters/http-client-adapter"
import { NotificationService } from "./notification-service"

const sessionRepository = new SessionRepository()

export const notificationService = new NotificationService(
    httpClient,
    pushNotification,
    sessionRepository
)