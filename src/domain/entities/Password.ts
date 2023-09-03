export class Password {
    value: string

    constructor(value: string) {
        const passwordRegex = /.{8,}/
        const isValidPassword = passwordRegex.test(value)

        if (isValidPassword) {
            this.value = value
            return
        }

        throw new Error("Password should contain at minimun 8 characters")
    }
}