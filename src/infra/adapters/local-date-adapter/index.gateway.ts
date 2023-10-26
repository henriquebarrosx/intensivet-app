import { LocalDateFormatEnum, Period, UnitPeriod } from "./types"

export interface ILocalDate {
    format(date: Period, format: LocalDateFormatEnum): string
    isSameYear(date: Period): boolean
    isToday(date: Period): boolean
    isValid(date: Period): boolean
    toISO(date: Period): string
    toUTC(date: Period): Date
    toZone(date: Period): Date
    diffBetweenTimes(from: Period, to: Period, unit?: UnitPeriod): number
    fromNow(date: Period): string
    addMinutes(date: Period, amount: number): Date
    subtractMinutes(date: Period, amount: number): Date
}
