import { localDate } from "../../../src/infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../../src/infra/adapters/local-date-adapter/types"

describe("validando adaptador de datas", () => {
    const expectation = localDate

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe("ao formatar uma data", () => {
        it("deve retornar um erro ao passar um data, do tipo Date, inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")
            const expectedFormat = LocalDateFormatEnum.datetime

            expect(() => expectation.format(expectedDate, expectedFormat))
                .toThrow("Invalid date format")
        })

        it("deve retornar um erro ao passar um data, do tipo String, inválida como parâmetro", () => {
            const expectedDate = "2023-13-01T12:00:00"
            const expectedFormat = LocalDateFormatEnum.datetime

            expect(() => expectation.format(expectedDate, expectedFormat))
                .toThrow("Invalid date format")
        })

        it("deve retornar um erro ao passar um data, do tipo number, inválida como parâmetro", () => {
            const expectedDate = 2023130112000020231301120000
            const expectedFormat = LocalDateFormatEnum.datetime

            expect(() => expectation.format(expectedDate, expectedFormat))
                .toThrow("Invalid date format")
        })

        it("deve retornar uma string com formato DD/MM/YYYY HH:mm", () => {
            const expectedDate = new Date("2023-11-01T12:00:00")
            const expectedString = "2023-11-01T12:00:00"
            const expectedNumber = new Date("2023-11-01T12:00:00").getTime()
            const expectedFormat = LocalDateFormatEnum.datetime

            expect(expectation.format(expectedDate, expectedFormat))
                .toBe("01/11/2023 12:00")

            expect(expectation.format(expectedString, expectedFormat))
                .toBe("01/11/2023 12:00")

            expect(expectation.format(expectedNumber, expectedFormat))
                .toBe("01/11/2023 12:00")
        })

        it("deve retornar uma string com formato DD/MM/YYYY", () => {
            const expectedDate = new Date("2023-11-01T12:00:00")
            const expectedString = "2023-11-01T12:00:00"
            const expectedNumber = new Date("2023-11-01T12:00:00").getTime()
            const expectedFormat = LocalDateFormatEnum.date

            expect(expectation.format(expectedDate, expectedFormat))
                .toBe("01/11/2023")

            expect(expectation.format(expectedString, expectedFormat))
                .toBe("01/11/2023")

            expect(expectation.format(expectedNumber, expectedFormat))
                .toBe("01/11/2023")
        })

        it("deve retornar uma string com formato HH:mm", () => {
            const expectedDate = new Date("2023-11-01T12:00:00")
            const expectedString = "2023-11-01T12:00:00"
            const expectedNumber = new Date("2023-11-01T12:00:00").getTime()
            const expectedFormat = LocalDateFormatEnum.time

            expect(expectation.format(expectedDate, expectedFormat))
                .toBe("12:00")

            expect(expectation.format(expectedString, expectedFormat))
                .toBe("12:00")

            expect(expectation.format(expectedNumber, expectedFormat))
                .toBe("12:00")
        })
    })

    describe("ao validar se uma data pertence ao ano atual", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.isSameYear(expectedDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar verdadeiro ao comparar com 2023", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01") })
            const expectedDate = new Date("2023-11-01T12:00:00")

            expect(expectation.isSameYear(expectedDate))
                .toBeTruthy()
        })

        it("deve retornar falso ao comparar com 2023", () => {
            jest.useFakeTimers({ now: new Date("2022-11-01") })
            const expectedDate = new Date("2023-11-01T12:00:00")

            expect(expectation.isSameYear(expectedDate))
                .toBeFalsy()
        })
    })

    describe("ao validar se uma data pertence ao dia atual", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.isToday(expectedDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar verdadeiro ao comparar com 01 de novembro de 2023", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01") })
            const expectedDate = new Date("2023-11-01")

            expect(expectation.isToday(expectedDate))
                .toBeTruthy()
        })

        it("deve retornar falso ao comparar com 01 de novembro de 2023", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01") })
            const expectedDate = new Date("2023-11-02")

            expect(expectation.isToday(expectedDate))
                .toBeFalsy()
        })
    })

    describe("ao validar se uma data é valida ou não", () => {
        it("deve retornar verdadeiro ao passar um data válida como parâmetro", () => {
            const expectedDate = new Date("2023-12-01T12:00:00")

            expect(expectation.isValid(expectedDate))
                .toBeTruthy()
        })

        it("deve retornar falso ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(expectation.isValid(expectedDate))
                .toBeFalsy()
        })
    })

    describe("ao converter uma data para ISO", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.toISO(expectedDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar uma data com +3 horas de diferença", () => {
            const HOUR = 60_000
            const BRAZIL_TIMEZONE = 180

            const actual = new Date(new Date("2023-11-01T12:00:00").getTime() + BRAZIL_TIMEZONE * HOUR)
            const expected = new Date("2023-11-01T15:00:00")

            expect(localDate.toISO(actual)).toEqual(expected.toISOString())
        })

        it("deve retornar uma data com +5 horas de diferença", () => {
            const HOUR = 60_000
            const RUSSIA_TIMEZONE = 300

            const actual = new Date(new Date("2023-11-01T12:00:00").getTime() + RUSSIA_TIMEZONE * HOUR)
            const expected = new Date("2023-11-01T17:00:00")

            expect(localDate.toISO(actual)).toEqual(expected.toISOString())
        })

        it("deve retornar uma data em formato ISO", () => {
            const actual = new Date("2023-11-01T17:00:00")
            expect(localDate.toISO(actual)).toEqual(actual.toISOString())
        })
    })

    describe("ao converter uma data para UTC", () => {
        const HOUR = 60_000
        const BRAZIL_TIMEZONE = 180

        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.toUTC(expectedDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar uma data com +3 horas de diferença", () => {
            const date = new Date("2023-11-01T12:00:00").getTime() + BRAZIL_TIMEZONE * HOUR

            expect(expectation.toUTC(date))
                .toEqual(new Date("2023-11-01T18:00:00.000Z"))

            jest.resetAllMocks()
        })
    })

    describe("ao converter uma data", () => {
        const HOUR = 60_000
        const UTC_TIMEZONE = 0
        const BRAZIL_TIMEZONE = 180
        const RUSSIA_TIMEZONE = 300
        const NOVA_YORK_TIMEZONE = -180

        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.toZone(expectedDate))
                .toThrow("Invalid date format")
        })

        it("para zona do Brasil (+03:00), deve retornar uma data com +3 horas de diferença", () => {
            const date = new Date("2023-11-01T12:00:00").getTime() + BRAZIL_TIMEZONE * HOUR
            const actual = expectation.toZone(date)
            const expected = new Date("2023-11-01T15:00:00")

            expect(localDate.toZone(actual)).toEqual(expected)
        })

        it("para a zona da Rússia (+05:00), deve retornar uma data com +5 horas de diferença", () => {
            const date = new Date("2023-11-01T12:00:00").getTime() + RUSSIA_TIMEZONE * HOUR
            const actual = expectation.toZone(date)
            const expected = new Date("2023-11-01T17:00:00")

            expect(localDate.toZone(actual.toString())).toEqual(expected)
        })

        it("para UTC (+00:00), deve retornar uma data com 0 horas de diferença", () => {
            const date = new Date("2023-11-01T12:00:00").getTime() + UTC_TIMEZONE * HOUR
            const actual = expectation.toZone(date)
            const expected = new Date("2023-11-01T12:00:00")

            expect(localDate.toZone(actual.toString())).toEqual(expected)
        })

        it("para Nova York (-03:00), deve retornar uma data com 0 horas de diferença", () => {
            const date = new Date("2023-11-01T12:00:00").getTime() + NOVA_YORK_TIMEZONE * HOUR
            const actual = expectation.toZone(date)
            const expected = new Date("2023-11-01T09:00:00")

            expect(localDate.toZone(actual.toString())).toEqual(expected)
        })
    })

    describe("ao pegar a diferença entre dois períodos", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const fromDate = new Date("2023-13-01T15:00:00")
            const toDate = new Date("2023-13-01T12:00:00")

            expect(() => expectation.diffBetweenTimes(fromDate, toDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar +3 quando a diferença for em anos", () => {
            const fromDate = new Date("2023-11-01T15:00:00")
            const toDate = new Date("2020-10-30T15:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "years"))
                .toBe(3)
        })

        it("deve retornar -3 quando a diferença for em anos", () => {
            const toDate = new Date("2023-11-01T15:00:00")
            const fromDate = new Date("2020-10-30T15:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "years"))
                .toBe(-3)
        })

        it("deve retornar +3 quando a diferença for em meses", () => {
            const fromDate = new Date("2023-11-01T15:00:00")
            const toDate = new Date("2023-08-01T12:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "months"))
                .toBe(3)
        })

        it("deve retornar -3 quando a diferença for em meses", () => {
            const toDate = new Date("2023-11-01T15:00:00")
            const fromDate = new Date("2023-08-01T12:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "months"))
                .toBe(-3)
        })

        it("deve retornar +3 quando a diferença for em dias", () => {
            const fromDate = new Date("2023-11-30T15:00:00")
            const toDate = new Date("2023-11-27T15:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "days"))
                .toBe(3)
        })

        it("deve retornar -3 quando a diferença for em horas", () => {
            const toDate = new Date("2023-11-30T15:00:00")
            const fromDate = new Date("2023-11-30T12:00:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "hours"))
                .toBe(-3)
        })

        it("deve retornar +3 quando a diferença for em minutos", () => {
            const fromDate = new Date("2023-11-30T12:00:00")
            const toDate = new Date("2023-11-30T11:57:00")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "minutes"))
                .toBe(3)
        })

        it("deve retornar -3 quando a diferença for em segundos", () => {
            const toDate = new Date("2023-11-30T12:00:00")
            const fromDate = new Date("2023-11-30T11:59:57")

            expect(expectation.diffBetweenTimes(fromDate, toDate, "seconds"))
                .toBe(-3)
        })
    })

    describe("ao pegar a diferença entre um período e o momento atual", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const expectedDate = new Date("2023-13-01T15:00:00")

            expect(() => expectation.fromNow(expectedDate))
                .toThrow("Invalid date format")
        })

        it("deve retornar 2 anos de diferença", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2021-11-01T12:00:00")

            expect(expectation.fromNow(expectedDate))
                .toBe("há 2 anos")
        })

        it("deve retornar 2 meses de diferença", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-09-01T12:00:00")

            expect(expectation.fromNow(expectedDate))
                .toBe("há 2 meses")
        })

        it("deve retornar 2 dias de diferença", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-10-30T12:00:00")

            expect(expectation.fromNow(expectedDate))
                .toBe("há 2 dias")
        })

        it("deve retornar 2 horas de diferença", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-11-01T10:00:00")

            expect(expectation.fromNow(expectedDate))
                .toBe("há 2 horas")
        })

        it("deve retornar 2 minutos de diferença", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-11-01T11:58:00")

            expect(expectation.fromNow(expectedDate))
                .toBe("há 2 minutos")
        })

        it("deve retornar a poucos segundos de diferença quando passados 45 segundos", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-11-01T11:59:16")

            expect(expectation.fromNow(expectedDate))
                .toBe("há poucos segundos")
        })

        it("deve retornar a poucos segundos de diferença quando não passados 45 segundos", () => {
            jest.useFakeTimers({ now: new Date("2023-11-01T12:00:00") })
            const expectedDate = new Date("2023-11-01T11:59:15")

            expect(expectation.fromNow(expectedDate))
                .toBe("há um minuto")
        })
    })

    describe("ao adicionar minutos à um período", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const actual = new Date("2023-13-01T15:00:00")

            expect(() => expectation.addMinutes(actual, 2))
                .toThrow("Invalid date format")
        })

        it("deve retornar +2 minutos", () => {
            const actual = new Date("2023-11-01T15:00:00")
            const expected = new Date("2023-11-01T15:02:00")

            expect(expectation.addMinutes(actual, 2).toISOString())
                .toBe(expected.toISOString())
        })
    })

    describe("ao subtrair minutos de um período", () => {
        it("deve retornar um erro ao passar um data inválida como parâmetro", () => {
            const actual = new Date("2023-13-01T15:00:00")

            expect(() => expectation.subtractMinutes(actual, 2))
                .toThrow("Invalid date format")
        })

        it("deve retornar +2 minutos", () => {
            const actual = new Date("2023-11-01T15:02:00")
            const expected = new Date("2023-11-01T15:00:00")

            expect(expectation.subtractMinutes(actual, 2).toISOString())
                .toBe(expected.toISOString())
        })
    })
})