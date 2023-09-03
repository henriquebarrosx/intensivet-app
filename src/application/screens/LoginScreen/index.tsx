import { FormContainer, KeyboardContainer } from "./styles"

import { withLoginForm } from "./hooks/withLoginForm"
import { SubmitButton } from "./components/SubmitButton"
import { ILoginFormGateway } from "./hooks/useLoginForm"
import { Keyboard } from "../../../domain/entities/Keyboard"
import { InputText } from "../../shared/components/InputText"
import { LogoImage } from "../../shared/components/LogoImage"
import { ScreenWrapper } from "../../shared/components/ScreenWrapper"
import { DeviceStatusBar } from "../../shared/components/DeviceStatusBar"
import { withGlobalProviders } from "../../shared/react-hooks/withGlobalProviders"

const keyboard = new Keyboard()

const ScreenWithLoginForm = withLoginForm(LoginScreen)
export const LoginScreenHOC = withGlobalProviders(ScreenWithLoginForm)

function LoginScreen({ loginForm }: Props) {
    return (
        <ScreenWrapper>
            <DeviceStatusBar />

            <KeyboardContainer behavior={keyboard.getBehavior()}>
                <LogoImage />

                <FormContainer>
                    <InputText
                        label="E-mail"
                        autoCorrect={true}
                        autoComplete="email"
                        value={loginForm.email}
                        autoCapitalize={"none"}
                        textContentType="emailAddress"
                        keyboardType={"email-address"}
                        placeholder="Digite seu e-mail"
                        validation={loginForm.emailValidation}
                        onChange={(text) => loginForm.onEmailType(text)}
                        clearValidation={loginForm.clearEmailValidation}
                    />

                    <InputText
                        label="Senha"
                        secureTextEntry
                        placeholder="Senha"
                        autoCapitalize={"none"}
                        value={loginForm.password}
                        validation={loginForm.passwordValidation}
                        onChange={(text) => loginForm.onPasswordType(text)}
                        clearValidation={loginForm.clearPasswordValidation}
                    />

                    <SubmitButton
                        isSubmitting={loginForm.isSubmitting}
                        onSubmit={loginForm.onSubmit}
                    />
                </FormContainer>
            </KeyboardContainer>
        </ScreenWrapper>
    )
}

type Props = {
    loginForm: ILoginFormGateway
}