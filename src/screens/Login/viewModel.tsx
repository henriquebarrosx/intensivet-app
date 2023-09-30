import * as yup from "yup"
import { Platform } from "react-native"
import { useState, useContext } from "react"

import { KeyboardBehavior } from "../../@types/common"
import { UserContext } from "../../context/UserContext"
import { useServices } from "../../context/ServicesContext"
import { useVetCaseIndicators } from "../../context/VetCaseIndicators"
import { pushNotification } from "../../infra/adapters/push-notification"

export interface Form { email: string, password: string }
const defaultFormSchema: Form = { email: "", password: "" }

export function useSignIn() {
    const { accountService } = useServices()
    const { save: setUserSession } = useContext(UserContext)
    const { makeRefreshVetCaseList } = useVetCaseIndicators()

    const [formData, onFormChange] = useState(defaultFormSchema)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [validations, setValidations] = useState<Partial<Form>>(defaultFormSchema)

    const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined as KeyboardBehavior

    async function onLoginPress(): Promise<void> {
        setIsSubmitting(true)

        if (await isValidForm(formData, setValidations)) {
            const pushNotificationToken = await pushNotification.generatePushToken()
            const requestBody = mountFormData(formData, pushNotificationToken)

            try {
                makeRefreshVetCaseList(true)
                const { email, password } = requestBody
                const response = await accountService.signIn(email, password, pushNotificationToken)
                const params = { ...response, expoToken: pushNotificationToken }
                setUserSession(params, pushNotificationToken!)
            }

            catch (error: any) {
                setIsSubmitting(false)
                const badCredentials = error?.response?.data?.error

                if (badCredentials) {
                    setValidations({ email: badCredentials, password: "" })
                }
            }

            return
        }

        return setIsSubmitting(false)
    }

    return {
        formData,
        validations,
        isSubmitting,
        onFormChange,
        onLoginPress,
        setValidations,
        keyboardBehavior,
    }
}

async function isValidForm(formData: Form, setValidation: (validation: Partial<Form>) => void): Promise<boolean | undefined> {
    try {
        const schema = yup.object().shape({
            password: yup.string().required("Campo obrigatório"),
            email: yup.string().required("Campo obrigatório").email("Email possui formato inválido"),
        })

        await schema.validate(formData)
        setValidation({ email: "", password: "" })

        return schema.isValid(formData)
    }

    catch (error: any) {
        setValidation({ [error.path]: error.message })
    }
}

interface SignIn {
    email: string
    password: string
    expo_push_token?: string
}

/* Prevents that undefined token be stored into API from a simulator */
function mountFormData(formData: Pick<SignIn, "email" | "password">, expo_push_token: string | undefined): SignIn | Pick<SignIn, "email" | "password"> {
    return expo_push_token ? { ...formData, expo_push_token } : formData
}
