// Docs: https://docs.sentry.io/platforms/react-native
import * as Sentry from "@sentry/react-native"
import { localDate } from "../local-date-adapter"
import { LocalDateFormatEnum } from "../local-date-adapter/index.gateway"

type LoggerParams = {
    endpoint?: string
    cause?: string
}

Sentry.init({
    dsn: "https://d0bb3ec74543499e774342cb20a4d7e0@o4505966712979456.ingest.sentry.io/4505969606721536"
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
