import moment from "moment"
import "moment/locale/pt-br"
import { ILocalDate } from "./index.gateway"

export const localDate: ILocalDate = {
    format(date, format): string {
        if (localDate.isValid(date)) return moment(date).format(format)
        throw new Error("Invalid date format")
    },

    isToday(date): boolean {
        if (localDate.isValid(date)) return moment(date).isSame(moment(), "day")
        throw new Error("Invalid date format")
    },

    isSameYear(date): boolean {
        if (localDate.isValid(date)) return moment(date).isSame(moment(), "year")
        throw new Error("Invalid date format")
    },

    isValid(date): boolean {
        return Number.isInteger(new Date(date).getTime())
    },

    toISO(date): string {
        if (localDate.isValid(date)) {
            return new Date(date).toISOString()
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
        if (!localDate.isValid(from) || !localDate.isValid(to)) {
            throw new Error("Invalid date format")
        }

        const fromDate = new Date(from)
        const toDate = new Date(to)
        const MILISECONDS_IN_SECOND = 1000
        const SECONDS_IN_MINUTE = 60
        const MINUTES_IN_HOUR = 60
        const HOURS_IN_DAY = 24
        const DAYS_IN_YEAR = 365.25

        if (unit === "years") {
            let diffInYears = fromDate.getFullYear() - toDate.getFullYear()

            const isBefore = fromDate.getMonth() < toDate.getMonth()
            const isSameMonth = fromDate.getMonth() === toDate.getMonth()
            const isBeforeInDays = fromDate.getDate() < toDate.getDate()

            if (isBefore || (isSameMonth && isBeforeInDays)) diffInYears - 1

            return diffInYears
        }

        if (unit === "months") {
            const ano1 = fromDate.getFullYear()
            const mes1 = fromDate.getMonth()
            const ano2 = toDate.getFullYear()
            const mes2 = toDate.getMonth()

            const diferencaEmMeses = (ano1 - ano2) * 12 + mes1 - mes2
            return diferencaEmMeses
        }

        if (unit === "days") {
            const anDayInMiliseconds = MILISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY
            const milisecondsDiff = Math.abs(toDate.getTime() - fromDate.getTime())
            const daysDiff = Math.floor(milisecondsDiff / anDayInMiliseconds)
            return daysDiff
        }

        if (unit === "hours") {
            const diferencaEmMilissegundos = fromDate.getTime() - toDate.getTime()
            const diferencaEmHoras = diferencaEmMilissegundos / (MILISECONDS_IN_SECOND * 60 * 60)
            return diferencaEmHoras
        }

        if (unit === "minutes") {
            const umMinutoEmMilissegundos = MILISECONDS_IN_SECOND * SECONDS_IN_MINUTE
            const diffEmMilissegundos = Math.abs(toDate.getTime() - fromDate.getTime())
            const diferencaEmMinutos = Math.floor(diffEmMilissegundos / umMinutoEmMilissegundos)
            return diferencaEmMinutos
        }

        const diferencaEmSegundos = (fromDate.getTime() - toDate.getTime()) / MILISECONDS_IN_SECOND
        return diferencaEmSegundos
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
        if (localDate.isValid(date)) {
            const period = moment(new Date(date)).add(amount, "minutes")
            return new Date(period.toISOString())
        }

        throw new Error("Invalid date format")
    },

    subtractMinutes(date, amount) {
        if (localDate.isValid(date)) {
            const period = moment(date).subtract(amount, "minutes").toString()
            return new Date(period)
        }

        throw new Error("Invalid date format")
    },
}