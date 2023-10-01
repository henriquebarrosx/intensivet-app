import NetInfo from "@react-native-community/netinfo"
import { createContext, useContext, useEffect, useState } from "react"

import { logger } from "../infra/adapters/logger-adapter"

type Props = {
    isConnected: boolean
}

const NetworkContext = createContext<Props>({ isConnected: true })

export function NetworkProvider({ children }) {
    const [isConnected, updateNetworkStatus] = useState(true)

    useEffect(() => {
        const unsubscribeListener = NetInfo.addEventListener((listener) => {
            updateNetworkStatus(listener.isConnected)
        })

        return () => {
            unsubscribeListener()
        }
    }, [])

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    )
}

export function useNetwork() {
    const context = useContext(NetworkContext)

    if (context) return context

    logger.error("REACT CONTEXT PROVIDER", "useNetwork must to be nested in NetworkProvider")
    throw new Error("useNetwork must to be nested in NetworkProvider")
}