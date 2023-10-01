export interface ILocalDate {
    format(date: Date | string | number, format: LocalDateFormatEnum): string
    isSameYear(date: Date | string | number): boolean
    isToday(date: Date | string | number): boolean
    isValid(date: Date | string | number): boolean
    toISO(date: Date | string | number): Date
}

export enum LocalDateFormatEnum {
    datetime = "DD/MM/YYYY HH:mm",
    date = "DD/MM/YYYY",
    time = "HH:mm"
}