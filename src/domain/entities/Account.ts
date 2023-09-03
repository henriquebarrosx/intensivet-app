import { Email } from "./Email"

export class Account {
    id: number
    accessToken: string
    role: string
    email: string
    doctorName: string
    exp: string
    thumbnail?: string

    withId(value: number): Account {
        this.id = value
        return this
    }

    withAccessToken(value: string): Account {
        this.accessToken = value
        return this
    }

    withRole(value: string): Account {
        this.role = value
        return this
    }

    withEmail(value: string): Account {
        const email = new Email(value)
        this.email = email.value
        return this
    }

    withDoctorName(value: string): Account {
        this.doctorName = value
        return this
    }

    withExp(value: string): Account {
        this.exp = value
        return this
    }

    withThumbnail(value: string): Account {
        this.thumbnail = value
        return this
    }

    toJSON() {
        return {
            id: this.id,
            access_token: this.accessToken,
            role: this.role,
            email: this.email,
            doctor_name: this.doctorName,
            exp: this.exp,
            thumbnail: this.thumbnail,
        }
    }
}