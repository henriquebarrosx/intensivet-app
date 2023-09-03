export class Vet {
    public id: number
    private firstName: string
    private lastName: string
    public gender: string
    private birthDate: Date
    public phone: string
    public crmv: string
    public accountId: number
    public clinicId: number
    public createdAt: Date
    public updatedAt: Date
    public deletedAt?: Date

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    getBirthDate(): string {
        return this.birthDate.toISOString()
    }

    withId(value: number): Vet {
        this.id = value
        return this
    }

    withFirstName(value: string): Vet {
        this.firstName = value
        return this
    }

    withLastName(value: string): Vet {
        this.lastName = value
        return this
    }

    withGender(value: string): Vet {
        this.gender = value
        return this
    }

    withBirthDate(value: Date | string | number): Vet {
        if (Number.isInteger(new Date(value).getTime())) {
            this.birthDate = new Date(value)
            return this
        }

        throw new Error(`[ Vet ] Invalid birth date ${value}`)
    }

    withPhone(value: string): Vet {
        this.phone = value
        return this
    }

    withCrmv(value: string): Vet {
        this.crmv = value
        return this
    }

    withAccountId(value: number): Vet {
        this.accountId = value
        return this
    }

    withClinicId(value: number): Vet {
        this.clinicId = value
        return this
    }

    withCreatedAt(value: Date | string | number): Vet {
        if (Number.isInteger(new Date(value).getTime())) {
            this.createdAt = new Date(value)
            return this
        }

        throw new Error(`[ Vet ] Invalid created at date ${value}`)
    }

    withUpdatedAt(value: Date | string | number): Vet {
        if (Number.isInteger(new Date(value).getTime())) {
            this.updatedAt = new Date(value)
            return this
        }

        throw new Error(`[ Vet ] Invalid updated at date ${value}`)
    }

    withDeletedAt(value: Date | string | number): Vet {
        if (Number.isInteger(new Date(value).getTime())) {
            this.deletedAt = new Date(value)
            return this
        }

        throw new Error(`[ Vet ] Invalid deletedAt at date ${value}`)
    }

    toJSON() {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            gender: this.gender,
            birth_date: this.birthDate,
            phone: this.phone,
            crmv: this.crmv,
            account_id: this.accountId,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            clinic_id: this.clinicId,
            deleted_at: this.deletedAt,
        }
    }
}