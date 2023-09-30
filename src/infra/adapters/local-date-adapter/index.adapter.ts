import moment from 'moment'
import 'moment/locale/pt-br'
import { ILocalDate, LocalDateFormatEnum } from "./index.gateway"
import { logger } from '..'

export class MomentJsAdapter implements ILocalDate {
    format(date: string | number | Date, format: LocalDateFormatEnum): string {
        if (this.isValid(date)) return moment(date).format(format)
    }

    isToday(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "day")
        logger.error("LOCAL DATE ADAPTER", "Invalid date format")
        throw new Error("Invalid date format")
    }

    isSameYear(date: string | number | Date): boolean {
        if (this.isValid(date)) return moment(date).isSame(moment(), "year")
    }

    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    }
}