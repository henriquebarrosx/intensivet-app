import React from "react"
import { View, Image } from "react-native"

import { styles } from "./styles"
import IntensivetLogo from "../../../../../assets/small-logo.png"

export function LogoImage() {
    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                source={IntensivetLogo}
                style={styles.companyLogo}
            />
        </View>
    )
}
