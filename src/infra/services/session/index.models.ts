export type SignInRequestModel = {
    email: string
    password: string
    expo_push_token?: string
}

export type SessionModel = {
    vet?: VetModel
    clinic?: ClinicModel
    current_account: AccountModel
}

export interface AccountModel {
    id: number
    access_token: string
    role: string
    email: string
    doctor_name: string
    exp: string
    thumbnail?: string
}

export interface VetModel {
    id: number
    first_name: string
    last_name: string
    gender: string
    birth_date: string
    phone: string
    crmv: string
    state_id: number
    account_id: number
    created_at: Date
    updated_at: Date
    clinic_id: number
    deleted_at?: any
}

export interface ClinicModel {
    id: number
    cnpj: string
    company_name: string
    fantasy_name: string
    phone: string
    cep: string
    address_street: string
    address_number: string
    address_complement: string
    address_district: string
    state_id: number
    city?: any
    created_at: Date
    updated_at: Date
    account_id: number
    deleted_at?: any
    phone2: string
    phone3: string
}