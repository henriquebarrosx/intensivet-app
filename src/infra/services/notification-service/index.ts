import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"
import { EnableOrDisableNotificationsRequest } from "./index.models"

export class NotificationService {
    constructor(private readonly httpClient: IHttpClient) { }

    async enable(pushNotificationToken: string): Promise<void> {
        await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
            "/api/v2/expo_token",
            { expo_push_token: pushNotificationToken }
        )
    }

    async disable(): Promise<void> {
        await this.httpClient.put<EnableOrDisableNotificationsRequest, void>(
            "/api/v2/expo_token",
            { expo_push_token: "" }
        )
    }
}