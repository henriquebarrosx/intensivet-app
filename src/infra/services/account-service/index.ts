import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"
import { SignInRequest, SignInResponse } from "./index.models"

export class AccountService {
    constructor(private readonly httpClient: IHttpClient) { }

    async signIn(email: string, password: string, pushNotificationToken: string) {
        const endpoint = "/api/v2/login"

        try {
            console.log("[SIGN IN] Authentication user requested", { endpoint })

            const response = await this.httpClient.post<SignInRequest, SignInResponse>(
                endpoint,
                { email, password, expo_push_token: pushNotificationToken }
            )

            return response
        }

        catch (error) {
            console.error("[SIGN IN] Authentication user requested", { endpoint }, { error })
            throw error
        }
    }
}