import { Vet } from "./Vet"
import { Clinic } from "./Clinic"
import { Account } from "./Account"

export class Session {
    vet?: Vet
    clinic?: Clinic
    account: Account
    deviceToken?: string

    withVet(value: Vet): Session {
        this.vet = value
        return this
    }

    withClinic(value: Clinic): Session {
        this.clinic = value
        return this
    }

    withAccount(value: Account): Session {
        this.account = value
        return this
    }

    withDeviceToken(value: string): Session {
        this.deviceToken = value
        return this
    }
}