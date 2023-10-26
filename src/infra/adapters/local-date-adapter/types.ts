export type Period = Date | string | number

export type UnitPeriod = "years" | "months" | "days" | "hours" | "minutes" | "seconds"

export enum LocalDateFormatEnum {
    datetime = "DD/MM/YYYY HH:mm",
    date = "DD/MM/YYYY",
    time = "HH:mm"
}