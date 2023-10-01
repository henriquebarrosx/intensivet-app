import moment from 'moment'
import 'moment/locale/pt-br'
import { ILocalDate, LocalDateFormatEnum } from "./index.gateway"

export const localDate: ILocalDate = {
    format(date: string | number | Date, format: LocalDateFormatEnum): string {
        if (this.isValid(date)) return moment(localDate.toISO(date)).format(format)
        throw new Error("Invalid date format")
    },

    isToday(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "day")
        throw new Error("Invalid date format")
    },

    isSameYear(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "year")
        throw new Error("Invalid date format")
    },

    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    },

    toISO(date): Date {
        return new Date(
            moment(new Date(date))
                .toISOString()
        )
    },
}