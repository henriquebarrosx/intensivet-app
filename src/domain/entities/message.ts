import { Account } from "./account"
import { DeviceFile } from "./device-file"

export class Message {
    id: number
    vetCaseId: number
    file?: DeviceFile
    account: Account
    message: string
    type: string
    isSent: boolean
    isSender: boolean
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date

    withId(value: number): Message {
        this.id = value
        return this
    }

    withFile(value: DeviceFile): Message {
        this.file = value
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

    withSentFlag(value: boolean): Message {
        this.isSent = value
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

        console.error("Invalid date format")
    }
}