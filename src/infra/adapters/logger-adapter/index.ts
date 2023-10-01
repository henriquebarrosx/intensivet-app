// Docs: https://docs.sentry.io/platforms/react-native
import * as Sentry from "@sentry/react-native"
import { env } from "../../config/environment"
import { localDate } from "../local-date-adapter"
import { LocalDateFormatEnum } from "../local-date-adapter/index.gateway"

type LoggerParams = {
    endpoint?: string
    cause?: string
}

Sentry.init({
    enableNative: false,
    dsn: env.sentry.dsn,
    environment: env.sentry.env,
})

export const logger = {
    /**
     * Logs an informational message with event details.
     * 
     * @param {string} event - The event name or identifier.
     * @param {string} description - A description or message associated with the event.
     * @param {LoggerParams} [params={}] - Additional parameters to include in the log.
     * */
    info(event: string, description: string, params: LoggerParams = {}) {
        const zonedTime = localDate.format(localDate.toZone(new Date()), LocalDateFormatEnum.datetime)
        const message = `[${zonedTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        console.log(message, params)
    },

    /**
     * Logs an error message with event details and sends it to Sentry.
     * 
     * @param {string} event - The event name or identifier.
     * @param {string} description - A description or message associated with the error.
     * @param {LoggerParams} [params={}] - Additional parameters to include in the log and error report.
     * */
    error(event: string, description: string, params: LoggerParams = {}) {
        const zonedTime = localDate.format(localDate.toZone(new Date()), LocalDateFormatEnum.datetime)
        const message = `[${zonedTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        Sentry.captureException(new Error(message, { cause: params.cause }))
        console.error(message, params)
    }
}
