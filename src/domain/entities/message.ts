import { Account } from "./account"
import { DeviceFile } from "./device-file"
import { logger } from "../../infra/adapters"

export class Message {
    id: number
    vetCaseId: number
    message: string
    type: string
    attachment?: DeviceFile
    account: Account
    isAdmin: boolean
    isSender: boolean
    createdAt: Date
    updatedAt: Date

    withId(value: number): Message {
        this.id = value
        return this
    }

    withFile(value: DeviceFile): Message {
        this.attachment = value
        return this
    }

    withVetCaseId(value: number): Message {
        this.vetCaseId = value
        return this
    }

    withAccount(value: Account): Message {
        this.account = value
        return this
    }

    withMessage(value: string): Message {
        this.message = value
        return this
    }

    withType(value: string): Message {
        this.type = value
        return this
    }

    withSenderFlag(value: boolean): Message {
        this.isSender = value
        return this
    }

    withAdminFlag(value: boolean): Message {
        this.isAdmin = value
        return this
    }

    withCreatedAt(value: Date | string | number): Message {
        if (Number.isInteger(new Date(value).getTime())) {
            this.createdAt = new Date(value)
            return this
        }

        logger.error("MESSAGE ENTITY", "Invalid date format")
    }
}