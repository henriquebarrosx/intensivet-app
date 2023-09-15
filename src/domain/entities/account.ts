export class Account {
    id: number
    accessToken: string
    role: string
    email: string
    doctorName: string
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
        this.email = value
        return this
    }

    withDoctorName(value: string): Account {
        this.doctorName = value
        return this
    }

    withThumbnail(value: string): Account {
        this.thumbnail = value
        return this
    }
}