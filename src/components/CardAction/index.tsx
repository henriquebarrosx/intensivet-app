import React, { Fragment } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

import { Routes } from "../../routes/index.routes"
import { Divider, InfoView, Container, ActionText, ActionIconBox, LeftInfoViewSide, Description } from "./styles"

type Props = {
    icon: any
    label: string
    unified?: boolean
    disabled?: boolean
    borderTop?: boolean
    description?: string
    iconZoneColor: string
    borderBottom?: boolean
    redirectToPath: keyof Routes
}

export function CardAction(props: Props) {
    const {
        label,
        iconZoneColor,
        redirectToPath,
        description,
        icon: InfoIcon,
        unified = false,
        disabled = false,
        borderTop = !props.unified,
        borderBottom = !props.unified,
    } = props

    const { navigate } = useNavigation()

    return (
        <Fragment>
            <Container unified={unified} hasBorderTop={borderTop} hasBorderBottom={borderBottom}>
                <InfoView onPress={() => navigate(redirectToPath)} disabled={disabled}>
                    <LeftInfoViewSide>
                        <ActionIconBox color={iconZoneColor}>
                            <InfoIcon />
                        </ActionIconBox>

                        <ActionText>{label}</ActionText>
                    </LeftInfoViewSide>

                    <Ionicons name="ios-chevron-forward" size={24} color="gray" />
                </InfoView>

                <Divider />
            </Container>

            {description && <Description>{description}</Description>}
        </Fragment>
    )
}
