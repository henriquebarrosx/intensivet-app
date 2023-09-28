import { User } from "../../../schemas/Account"

export type SignInRequest = {
    email: string
    password: string
    expo_push_token?: string
}

export type SignInResponse = Omit<User, "expoToken">