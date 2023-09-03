export class Clinic {
    public id: number
    public accountId: number
    public companyName: string
    public fantasyName: string
    public cnpj: string
    public phone: string
    public phone2: string
    public phone3: string
    public cep: string
    public addressStreet: string
    public addressNumber: string
    public addressComplement: string
    public addressDistrict: string
    public state?: string
    public city?: string
    public createdAt: Date
    public updatedAt: Date
    public deletedAt?: Date

    withId(value: number): Clinic {
        this.id = value
        return this
    }

    withAccountId(value: number): Clinic {
        this.accountId = value
        return this
    }

    withCompanyName(value: string): Clinic {
        this.companyName = value
        return this
    }

    withFantasyName(value: string): Clinic {
        this.fantasyName = value
        return this
    }

    withCnpj(value: string): Clinic {
        this.cnpj = value
        return this
    }

    withPhone1(value: string): Clinic {
        this.phone = value
        return this
    }

    withPhone2(value: string): Clinic {
        this.phone2 = value
        return this
    }

    withPhone3(value: string): Clinic {
        this.phone3 = value
        return this
    }

    withCep(value: string): Clinic {
        this.cep = value
        return this
    }

    withAddressStreet(value: string): Clinic {
        this.addressStreet = value
        return this
    }

    withAddressNumber(value: string): Clinic {
        this.addressNumber = value
        return this
    }

    withAddressComplement(value: string): Clinic {
        this.addressComplement = value
        return this
    }

    withAddressDistrict(value: string): Clinic {
        this.addressDistrict = value
        return this
    }

    withState(value: string): Clinic {
        this.state = value
        return this
    }

    withCity(value: string): Clinic {
        this.city = value
        return this
    }

    withCreatedAt(value: Date | string | number): Clinic {
        if (Number.isInteger(new Date(value).getTime())) {
            this.createdAt = new Date(value)
            return this
        }

        throw new Error(`[ Clinic ] Invalid created at date ${value}`)
    }

    withUpdatedAt(value: Date | string | number): Clinic {
        if (Number.isInteger(new Date(value).getTime())) {
            this.updatedAt = new Date(value)
            return this
        }

        throw new Error(`[ Clinic ] Invalid updated at date ${value}`)
    }

    withDeletedAt(value: Date | string | number): Clinic {
        if (Number.isInteger(new Date(value).getTime())) {
            this.deletedAt = new Date(value)
            return this
        }

        throw new Error(`[ Clinic ] Invalid deletedAt at date ${value}`)
    }

    toJSON() {
        return {
            id: this.id,
            accountId: this.accountId,
            companyName: this.companyName,
            fantasyName: this.fantasyName,
            cnpj: this.cnpj,
            phone: this.phone,
            phone2: this.phone2,
            phone3: this.phone3,
            cep: this.cep,
            addressStreet: this.addressStreet,
            addressNumber: this.addressNumber,
            addressComplement: this.addressComplement,
            addressDistrict: this.addressDistrict,
            state: this.state,
            city: this.city,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        }
    }
}