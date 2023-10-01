import moment from "moment"
import "moment/locale/pt-br"
import { ILocalDate } from "./index.gateway"

export const localDate: ILocalDate = {
    format(date, format): string {
        if (localDate.isValid(date)) {
            return moment(date).format(format)
        }

        throw new Error("Invalid date format")
    },

    isToday(date): boolean {
        if (localDate.isValid(date)) {
            return moment(date).isSame(moment(), "day")
        }

        throw new Error("Invalid date format")
    },

    isSameYear(date): boolean {
        if (localDate.isValid(date)) {
            return moment(date).isSame(moment(), "year")
        }

        throw new Error("Invalid date format")
    },

    isValid(date): boolean {
        return Number.isInteger(new Date(date).getTime())
    },

    toISO(date): Date {
        if (localDate.isValid(date)) {
            const period = moment(date).toISOString()
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },

    toUTC(date): Date {
        if (localDate.isValid(date)) {
            const period = moment(date).utc().toString()
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },

    diffBetweenTimes(from, to, unit): number {
        if (localDate.isValid(from) && localDate.isValid(to)) {
            return moment(from).diff(to, unit)
        }

        throw new Error("Invalid date format")
    },

    fromNow(date) {
        if (localDate.isValid(date)) {
            const period = moment(date).fromNow()
            return period
        }

        throw new Error("Invalid date format")
    },

    toZone(date) {
        if (localDate.isValid(date)) {
            const timezoneOffSet = new Date().getTimezoneOffset()

            const removeDiffTmz = timezoneOffSet > 0
                ? localDate.subtractMinutes(new Date(date), timezoneOffSet)
                : localDate.addMinutes(new Date(date), timezoneOffSet)

            const period = removeDiffTmz.toISOString().split(".").at(0)
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },

    addMinutes(date, amount) {
        if (localDate.isValid) {
            const period = moment(date).add(amount, "minutes").toString()
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },

    subtractMinutes(date, amount) {
        if (localDate.isValid) {
            const period = moment(date).subtract(amount, "minutes").toString()
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },
}