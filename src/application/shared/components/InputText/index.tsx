import React, { Fragment } from "react"
import { mask } from "react-native-mask-text"
import { TextInputProps, TouchableOpacity } from "react-native"
import SecureTextIcon from "react-native-vector-icons/FontAwesome"

import { Container, Input, Label, ValidationMessage } from "./style"

import { Theme } from "../../../../domain/entities/Theme"
import { useToggle } from "../../react-hooks/useToggle"

export function InputText(props: Props) {
    const {
        label,
        onChange,
        validation,
        maskType = "default",
        secureTextEntry = false,
        clearValidation = () => { },
        ...others
    } = props

    const [isSecureTextVisible, toggleSecureText] = useToggle(secureTextEntry)
    const secureTextIcon = isSecureTextVisible ? "eye-slash" : "eye"

    function onValueChange(text: string): void {
        if (validation) clearValidation()

        const maskTypes = {
            default: text,
            date: mask(text, '99/99/9999'),
            cpf: mask(text, '999.999.999-99'),
            phoneNumber: mask(text, '(99) 99999-9999'),
        }

        onChange(maskTypes[maskType] ?? "")
    }

    return (
        <Fragment>
            <Label>{label}</Label>

            <Container hasError={!!validation}>
                <Input
                    {...others}
                    onBlur={clearValidation}
                    onChangeText={onValueChange}
                    secureTextEntry={isSecureTextVisible}
                    hasSecureIndicator={isSecureTextVisible}
                />

                {isSecureTextVisible && (
                    <TouchableOpacity onPress={() => toggleSecureText()}>
                        <SecureTextIcon name={secureTextIcon} size={24} color={Theme.colors.primary} />
                    </TouchableOpacity>
                )}
            </Container>

            {!!validation && (
                <ValidationMessage>{validation}</ValidationMessage>
            )}
        </Fragment>
    )
}

type Props = TextInputProps & {
    label: string
    validation?: string
    secureTextEntry?: boolean
    maskType?: "default" | "cpf" | "phoneNumber" | "date"
    clearValidation?: () => void
    onChange(text: string): void
}