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
    async info(event: string, description: string, params: LoggerParams = {}) {
        const currentDateTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
        const message = `[${currentDateTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        console.log(message, params)
    },

    async error(event: string, description: string, params: LoggerParams = {}) {
        const currentDateTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
        const message = `[${currentDateTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        Sentry.captureException(new Error(message, { cause: params.cause }))
        console.error(message, params)
    }
}
