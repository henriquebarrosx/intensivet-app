import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"
import { EnableOrDisableNotificationsRequest } from "./index.models"

export class NotificationService {
    constructor(private readonly httpClient: IHttpClient) { }

    async enable(pushNotificationToken: string): Promise<void> {
        const endpoint = "/api/v2/expo_token"

        try {
            console.log("[NOTIFICATION] Enable requested", { endpoint })

            await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
                endpoint,
                { expo_push_token: pushNotificationToken }
            )

            return
        }

        catch (error) {
            console.log("[NOTIFICATION] Enable requested", { endpoint }, { error })
            throw error
        }
    }

    async disable(): Promise<void> {
        const endpoint = "/api/v2/expo_token"

        try {
            console.log("[NOTIFICATION] Disable requested", { endpoint })

            await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
                endpoint,
                { expo_push_token: "" }
            )

            return
        }

        catch (error) {
            console.log("[NOTIFICATION] Disable requested", { endpoint }, { error })
            throw error
        }
    }
}