import { AsyncStorageStatic } from "@react-native-async-storage/async-storage"

import { VetMapper } from "../../mappers/vet-mapper"
import { ClinicMapper } from "../../mappers/clinic-mapper"
import { AccountMapper } from "../../mappers/account-mapper"

import { SessionRepositoryGateway } from "./index.gateway"
import { Session } from "../../../domain/entities/Session"
import { AccountModel, ClinicModel, VetModel } from "../../services/session/index.models"

export class SessionRepository implements SessionRepositoryGateway {
    constructor(readonly database: AsyncStorageStatic) { }

    LOCAL_STORAGE_SESSION_KEY = "&intensivet_session_data"

    async save(session: Session): Promise<void> {
        console.log("[ Session ] Saving session...")
        const stringifiedSession = JSON.stringify(session)
        await this.database.setItem(this.LOCAL_STORAGE_SESSION_KEY, stringifiedSession)
    }

    async find(): Promise<Session> {
        console.log("[ Session ] Finding session...")
        const stringifiedSessionData = await this.database.getItem(this.LOCAL_STORAGE_SESSION_KEY)

        if (!stringifiedSessionData) {
            console.log("[ Session ] No session found!")
            return undefined
        }

        const sessionData: SessionModel = JSON.parse(stringifiedSessionData)
        console.log(`[ Session ] Session found: ${stringifiedSessionData}`)
        const account = AccountMapper.map(sessionData.account)
        const clinic = ClinicMapper.map(sessionData.clinic)
        const vet = VetMapper.map(sessionData.vet)

        return new Session()
            .withVet(vet)
            .withClinic(clinic)
            .withAccount(account)
            .withDeviceToken(sessionData.deviceToken)
    }

    async removeItem(): Promise<void> {
        console.log("[ Session ] Destroying session...")
        await this.database.removeItem(this.LOCAL_STORAGE_SESSION_KEY)
    }
}

export type SessionModel = {
    vet: VetModel
    clinic: ClinicModel
    account: AccountModel
    deviceToken: string
}
