import { Session } from "../../../domain/entities/Session"

export interface SessionServiceGateway {
    signIn(email: string, password: string, deviceToken: string): Promise<Session>
}