import { IHttpClient } from "../../adapters/http-client-adapter/index.gateway"
import { SignInRequest, SignInResponse } from "./index.models"

export class AccountService {
    constructor(private readonly httpClient: IHttpClient) { }

    async signIn(email: string, password: string, pushNotificationToken: string) {
        const response = await this.httpClient.post<SignInRequest, SignInResponse>(
            "/api/v2/login",
            { email, password, expo_push_token: pushNotificationToken }
        )

        return response
    }
}