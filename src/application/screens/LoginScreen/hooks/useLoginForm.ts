import { useState } from "react"
import { LoginForm } from "../../../../domain/entities/LoginForm"
import { useToggle } from "../../../shared/react-hooks/useToggle"
import { SessionServiceGateway } from "../../../../infra/services/session/index.gateway"
import { Output as ISessionCtxGateway } from "../../../shared/react-hooks/useSession"
import { DeviceNotificationsGateway } from "../../../../infra/adapters/notifications-adapter/index.gateway"

export function useLoginForm(
    navigation: any,
    sessionContext: ISessionCtxGateway,
    sessionService: SessionServiceGateway,
    deviceNotifications: DeviceNotificationsGateway,
): ILoginFormGateway {
    const [email, onEmailType] = useState("")
    const [password, onPasswordType] = useState("")
    const [emailValidation, changeEmailValidation] = useState("")
    const [isSubmitting, toggleSubmitAnimation] = useToggle(false)
    const [passwordValidation, changePasswordValidation] = useState("")

    function clearEmailValidation(): void {
        changeEmailValidation("")
    }

    function clearPasswordValidation(): void {
        changePasswordValidation("")
    }

    async function onSubmit(): Promise<void> {
        const loginForm = new LoginForm()

        loginForm.validate(email.trim(), password.trim())
        changeEmailValidation(loginForm.validations.email)
        changePasswordValidation(loginForm.validations.password)

        try {
            toggleSubmitAnimation()

            if (loginForm.isValid) {
                await deviceNotifications.requestPermission()
                const deviceToken = await deviceNotifications.getDeviceToken()

                const session = await sessionService.signIn(email, password, deviceToken)
                await sessionContext.save(session)
                navigation.replace("VetCases")
                return
            }

            return
        }

        catch (error) {
            console.log("[ Sign in ] Something wrong happens: ", error?.message)
            const invalidAuthenticationMessage = error?.response?.data?.error
            changeEmailValidation(invalidAuthenticationMessage)
        }

        finally {
            toggleSubmitAnimation()
        }
    }

    return {
        email,
        password,
        emailValidation,
        passwordValidation,
        isSubmitting,
        onSubmit,
        onEmailType,
        onPasswordType,
        clearEmailValidation,
        clearPasswordValidation,
    }
}

export type ILoginFormGateway = {
    email: string
    password: string
    emailValidation: string
    passwordValidation: string
    isSubmitting: boolean
    onSubmit(): Promise<void>
    onEmailType(text: string): void
    onPasswordType(text: string): void
    clearEmailValidation(): void
    clearPasswordValidation(): void
}