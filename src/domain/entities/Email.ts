export class Email {
    value: string

    constructor(value: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const isValidEmail = emailRegex.test(value)

        if (isValidEmail) {
            this.value = value
            return
        }

        throw new Error("Invalid e-mail format")
    }
}