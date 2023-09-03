import * as SplashScreen from "expo-splash-screen"
import { ReactNode, createContext, useContext, useState } from "react"

import { Session } from "../../../domain/entities/Session"
import { SessionRepositoryGateway } from "../../../infra/repositories/session-repository/index.gateway"

const SessionContext = createContext({} as Output)

export function SessionProvider(props: Input) {
    const { children, navigation, sessionRepository } = props

    const [session, setSession] = useState<Session | null>(null)

    const isAdmin = session?.account?.role === "admin"

    async function init(): Promise<void> {
        const session = await sessionRepository.find()
        setSession(session || null)

        await SplashScreen.hideAsync()

        const screenName = !!session ? "VetCases" : "Login"
        navigation.replace(screenName)
    }

    async function save(session: Session): Promise<void> {
        await sessionRepository.save(session)
        setSession(session)
    }

    async function destroy(): Promise<void> {
        await sessionRepository.removeItem()
        setSession(null)
    }

    return (
        <SessionContext.Provider
            value={{
                isAdmin,
                init,
                save,
                destroy,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export function useSession(): Output {
    const context = useContext(SessionContext)
    const isContextNotFound = Object.keys(context).length === 0

    if (isContextNotFound) {
        throw new Error("useSession should be nested in SessionProvider")
    }

    return context
}

type Input = {
    navigation: any
    children: ReactNode
    sessionRepository: SessionRepositoryGateway
}

export type Output = {
    isAdmin: boolean
    init(): Promise<void>
    save(session: Session): Promise<void>
    destroy(): Promise<void>
}