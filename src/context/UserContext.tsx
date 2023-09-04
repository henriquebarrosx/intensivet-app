import * as SplashScreen from 'expo-splash-screen';
import React, {useMemo, useState, useCallback, createContext, Dispatch, SetStateAction, useContext} from 'react';

import { User } from '../schemas/Account';
import { Session } from '../models/Session';
import { WithChildren } from '../@types/common';
import { navigationRef } from '../utils/navigation';

interface UserContextType {
    isAdmin: boolean;
    userData: User | null;
    handleUserSession: () => void;
    clinic_id: number | null | undefined;
    setUserData: Dispatch<SetStateAction<User | null>>
    setUserSession: (userData: User, expoPushToken: string) => void;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function SessionProvider({ children }: WithChildren) {
    const [userData, setUserData] = useState<User | null>({} as User);

    const handleUserSession = useCallback(async () => {
        try {
            const session: User | null = await new Session().get();

            if (session) {
                setUserData(session);
                await SplashScreen.hideAsync();

                return;
            }

            await SplashScreen.hideAsync();
            return navigationRef.current?.navigate("Login");
        } catch (error) {
            await SplashScreen.hideAsync();

            console.error('Houve um problema ao buscar a sessão do usuário');
            console.error(error);
        }
    }, []);

    const setUserSession = useCallback(async (userSession: User, expoPushToken: string) => {
        await new Session().set({ ...userSession, expoToken: expoPushToken! });
        setUserData(userSession);
    }, []);

    const isAdmin = userData?.current_account?.role === 'admin'
    const clinic_id = isAdmin ? null : userData?.clinic?.id

    return (
        <UserContext.Provider
            value={{
                isAdmin,
                userData,
                clinic_id,
                setUserData,
                setUserSession,
                handleUserSession,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useSession() {
    const context = useContext(UserContext);
    const isContextNotFound = Object.keys(context).length === 0

    if (isContextNotFound) {
        throw new Error("useSession should be nested in SessionProvider");
    }

    return context;
}
