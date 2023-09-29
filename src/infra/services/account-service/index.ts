import { logger } from "../../adapters"
import { SignInRequest, SignInResponse } from "./index.models"
import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"

export class AccountService {
    constructor(private readonly httpClient: IHttpClient) { }

    async signIn(email: string, password: string, pushNotificationToken: string) {
        const endpoint = "/api/v2/login"

        try {
            await logger.info("SIGN IN", "Request authentication", { endpoint })

            const response = await this.httpClient.post<SignInRequest, SignInResponse>(
                endpoint,
                { email, password, expo_push_token: pushNotificationToken }
            )

            return response
        }

        catch (error) {
            await logger.error("SIGN IN", "Request authentication", { endpoint, cause: error?.message })
            throw error
        }
    }
}