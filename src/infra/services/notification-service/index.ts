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
            console.log("[NOTIFICATION] Enable requested", { endpoint })
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
            console.log("[NOTIFICATION] Enable requested", { endpoint }, { error })
            throw error
        }
    }

    async disable(): Promise<string> {
        const endpoint = "/api/v2/expo_token"

        try {
            console.log("[NOTIFICATION] Disable requested", { endpoint })
            this.pushNotification.disableNotificationsLocally()

            await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
                endpoint,
                { expo_push_token: "" }
            )

            await this.sessionRepository.update({ expoToken: "" })
            return ""
        }

        catch (error) {
            console.log("[NOTIFICATION] Disable requested", { endpoint }, { error })
            throw error
        }
    }
}