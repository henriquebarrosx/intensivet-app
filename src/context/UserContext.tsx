import * as SplashScreen from "expo-splash-screen"
import React, { useState, createContext, useContext } from "react"

import { User } from "../schemas/Account"
import { WithChildren } from "../@types/common"
import { navigationRef } from "../utils/navigation"
import { logger } from "../infra/adapters/logger-adapter"
import { SessionRepository } from "../infra/repositories/session"

interface UserContextType {
    isAdmin: boolean
    sessionData: User | null
    isAuthenticated: boolean
    clinicId: number | null | undefined
    clear(): Promise<void>
    retrieve(): Promise<void>
    update(params: Partial<User>): void
    save: (userData: User, expoPushToken: string) => void
}

export const UserContext = createContext<UserContextType>(null)

export function SessionProvider({ children }: WithChildren) {
    const [sessionData, updateSessionState] = useState<User | null>(null)
    const sessionRepository = new SessionRepository()

    async function retrieve(): Promise<void> {
        const session: User | null = await sessionRepository.get()

        if (session) {
            updateSessionState(session)
            await SplashScreen.hideAsync()
            return
        }

        await SplashScreen.hideAsync()
        return navigationRef.current?.navigate("Login")
    }

    async function save(userSession: User, expoToken: string) {
        await sessionRepository.save({ ...userSession, expoToken })
        updateSessionState(userSession)
    }

    async function clear(): Promise<void> {
        await sessionRepository.clear()
        updateSessionState(null)
    }

    function update(params: Partial<User>) {
        updateSessionState((prevState) => ({ ...prevState, ...params }))
    }

    const isAdmin = sessionData?.current_account?.role === "admin"
    const clinicId = isAdmin ? null : sessionData?.clinic?.id
    const isAuthenticated = !!sessionData?.current_account?.access_token

    return (
        <UserContext.Provider
            value={{
                isAdmin,
                clinicId,
                sessionData,
                isAuthenticated,
                save,
                clear,
                update,
                retrieve,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useSession() {
    const context = useContext(UserContext)
    if (context) return context

    const errorMessage = "useSession should be nested in SessionProvider"
    logger.error("REACT CONTEXT PROVIDER", errorMessage)
    throw new Error(errorMessage)
}
