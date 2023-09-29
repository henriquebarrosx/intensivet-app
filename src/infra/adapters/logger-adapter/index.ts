import analytics from "@react-native-firebase/analytics"

type LoggerParams = {
    endpoint?: string
    cause?: string
}

export class Logger {
    async info(event: string, message: string, params: LoggerParams = {}) {
        const logMessage = `INFO: [${event.toUpperCase()}] - ${message.toLowerCase()}`

        console.log(logMessage, params)
        await analytics()
            .logEvent(
                event.toLowerCase().replaceAll(" ", "_"),
                { params: { ...params, message: logMessage } }
            )
    }

    async error(event: string, message: string, params: LoggerParams = {}) {
        const logMessage = `ERROR: [${event.toUpperCase()}] - ${message.toLowerCase()}`

        console.error(logMessage, params)
        await analytics()
            .logEvent(
                event.toLowerCase().replaceAll(" ", "_"),
                { params: { ...params, message: logMessage } }
            )
    }
}