export interface ILocalDate {
    format(date: Period, format: LocalDateFormatEnum): string
    isSameYear(date: Period): boolean
    isToday(date: Period): boolean
    isValid(date: Period): boolean
    toISO(date: Period): Date
    toUTC(date: Period): Date
    toZone(date: Period): Date
    diffBetweenTimes(from: Period, to: Period, unit?: UnitPeriod): number
    fromNow(date: Period): string
    addMinutes(date: Period, amount: number): Date
    subtractMinutes(date: Period, amount: number): Date
}

export type Period = Date | string | number

export type UnitPeriod = (
    "year" | "years" |
    "month" | "months" |
    "week" | "weeks" |
    "day" | "days" |
    "hour" | "hours" |
    "minute" | "minutes" |
    "second" | "seconds" |
    "millisecond" | "milliseconds"
)

export enum LocalDateFormatEnum {
    datetime = "DD/MM/YYYY HH:mm",
    date = "DD/MM/YYYY",
    time = "HH:mm"
}