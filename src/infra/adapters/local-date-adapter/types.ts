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