import { logger } from "../../adapters"
import { SessionRepository } from "../../repositories/session"
import { EnableOrDisableNotificationsRequest } from "./index.models"
import { PushNotificationAdapter } from "../../adapters/push-notification"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class NotificationService {
    constructor(
        private readonly httpClient: IHttpClient,
        private readonly pushNotification: PushNotificationAdapter,
        private readonly sessionRepository: SessionRepository,
    ) { }

    async enable(): Promise<string> {
        const endpoint = "/api/v2/expo_token"

        try {
            logger.info("NOTIFICATION", "Request to enable", { endpoint })
            const expoToken = await this.pushNotification.generatePushToken()
            this.pushNotification.enableNotificationsLocally()

            await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
                endpoint,
                { expo_push_token: expoToken }
            )

            await this.sessionRepository.update({ expoToken })
            return expoToken
        }

        catch (error) {
            logger.error("NOTIFICATION", "Request to enable", { endpoint, cause: error })
            throw error
        }
    }

    async disable(): Promise<string> {
        const endpoint = "/api/v2/expo_token"

        try {
            logger.info("NOTIFICATION", "Request to disable", { endpoint })
            this.pushNotification.disableNotificationsLocally()

            await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
                endpoint,
                { expo_push_token: "" }
            )

            await this.sessionRepository.update({ expoToken: "" })
            return ""
        }

        catch (error) {
            logger.error("NOTIFICATION", "Request to disable", { endpoint, cause: error })
            throw error
        }
    }
}