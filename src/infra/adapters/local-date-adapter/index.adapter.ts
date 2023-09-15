import moment from 'moment'
import 'moment/locale/pt-br'
import { ILocalDate, LocalDateFormatEnum } from "./index.gateway"

export class MomentJsAdapter implements ILocalDate {
    format(date: string | number | Date, format: LocalDateFormatEnum): string {
        if (this.isValid(date)) return moment(date).format(format)
        throw new Error("Invalid date format")
    }

    isToday(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "day")
        throw new Error("Invalid date format")
    }

    isSameYear(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "year")
        throw new Error("Invalid date format")
    }

    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    }
}