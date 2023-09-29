import { Logger as LoggerAdapter } from "./logger-adapter"
import { PushNotificationAdapter } from "./push-notification"

export const logger = new LoggerAdapter()
export const pushNotification = new PushNotificationAdapter()