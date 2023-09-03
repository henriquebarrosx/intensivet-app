import { Account } from "../entities/Account"
import { AccountModel } from "../../infra/services/session/index.models"

export class AccountMapper {
    private constructor() { }

    static map(accountData: AccountModel): Account {
        const account = new Account()
            .withId(accountData.id)
            .withAccessToken(accountData.access_token)
            .withDoctorName(accountData.doctor_name)
            .withEmail(accountData.email)
            .withExp(accountData.exp)
            .withRole(accountData.role)
            .withThumbnail(accountData.thumbnail)

        return account
    }
}