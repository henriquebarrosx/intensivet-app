import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AvatarArea, Container, ScreenTitle } from "./styles"
import { Theme } from "../../../../../domain/entities/Theme"

export function Header({ onAvatarPress }: Props) {
    return (
        <Container>
            <ScreenTitle>Casos</ScreenTitle>

            <AvatarArea>
                <MaterialCommunityIcons
                    size={35}
                    name="account-circle"
                    onPress={onAvatarPress}
                    color={Theme.colors.gray}
                />
            </AvatarArea>
        </Container>
    )
}

type Props = {
    onAvatarPress(): void
}