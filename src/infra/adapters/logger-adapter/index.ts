import * as Sentry from "@sentry/react-native"
import { localDate } from "../local-date-adapter"
import { LocalDateFormatEnum } from "../local-date-adapter/index.gateway"

type LoggerParams = {
    endpoint?: string
    cause?: string
}

export class LoggerAdapter {
    constructor() {
        Sentry.init({
            dsn: "https://41768051e632d977287cbce95f0a2645@o4505966712979456.ingest.sentry.io/4505966714683392"
        })
    }

    async info(event: string, description: string, params: LoggerParams = {}) {
        const currentDateTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
        const message = `[${currentDateTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        console.log(message, params)
    }

    async error(event: string, description: string, params: LoggerParams = {}) {
        const currentDateTime = localDate.format(new Date(), LocalDateFormatEnum.datetime)
        const message = `[${currentDateTime}] INFO: (${event.toUpperCase()}): ${description.toLowerCase()}`
        Sentry.captureException(new Error(message, { cause: params.cause }))
        console.error(message, params)
    }
}