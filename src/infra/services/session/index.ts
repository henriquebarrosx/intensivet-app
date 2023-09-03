import { VetMapper } from "../../mappers/vet-mapper"
import { ClinicMapper } from "../../mappers/clinic-mapper"
import { AccountMapper } from "../../mappers/account-mapper"

import { SessionServiceGateway } from "./index.gateway"
import { Session } from "../../../domain/entities/Session"
import { SignInRequestModel, SessionModel } from "./index.models"
import { IHttpClient } from "../../adapters/axios-adapter/index.gateway"

export class SessionService implements SessionServiceGateway {
    constructor(private readonly httpClient: IHttpClient) { }

    async signIn(email: string, password: string, deviceToken: string): Promise<Session> {
        const sessionData = await this.httpClient
            .post<SignInRequestModel, SessionModel>(
                "/api/v2/login",
                { email, password, expo_push_token: deviceToken }
            )

        const vet = VetMapper.map(sessionData.vet)
        const clinic = ClinicMapper.map(sessionData.clinic)
        const account = AccountMapper.map(sessionData.current_account)

        return new Session()
            .withVet(vet)
            .withClinic(clinic)
            .withAccount(account)
    }
}