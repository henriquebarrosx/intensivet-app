import { Email } from "./Email"
import { Password } from "./Password"

export class LoginForm {
    isValid: boolean = false

    validations = {
        email: "",
        password: "",
    }

    validate(email: string, password: string) {
        this.validations.email = ""
        this.validations.password = ""
        this.validateEmail(email)
        this.validatePassword(password)
        this.isValid = Object.values(this.validations).every((key) => key === "")
    }

    private validateEmail(value: string) {
        if (!value) {
            this.validations.email = "Campo Obrigatório"
            return
        }

        try { new Email(value) }
        catch { this.validations.email = "Email possui formato inválido" }
    }

    private validatePassword(value: string) {
        if (!value) {
            this.validations.password = "Campo Obrigatório"
            return
        }

        try { new Password(value) }
        catch { this.validations.password = "Senha deve possuir no mínimo 8 caracteres" }
    }
}