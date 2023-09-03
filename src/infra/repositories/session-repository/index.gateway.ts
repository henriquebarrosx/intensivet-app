import { Session } from "../../../domain/entities/Session"

export interface SessionRepositoryGateway {
    save(session: Session): Promise<void>
    find(): Promise<Session | undefined>
    removeItem(): Promise<void>
}