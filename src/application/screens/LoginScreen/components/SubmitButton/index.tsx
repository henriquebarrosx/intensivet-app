import { DotIndicator } from "react-native-indicators"
import { ButtonContainer, ButtonText, LoaderContainer } from "./styles"

export function SubmitButton(props: Props) {
    const { isSubmitting, onSubmit } = props

    return (
        <ButtonContainer onPress={onSubmit}>
            {isSubmitting ? (
                <LoaderContainer>
                    <DotIndicator size={6} color={"#F5F5F5"} />
                </LoaderContainer>
            ) : <ButtonText>Acessar</ButtonText>}
        </ButtonContainer>
    )
}

type Props = {
    isSubmitting: boolean
    onSubmit(): Promise<void>
}