import React from "react"
import { View, Image } from "react-native"

import { styles } from "./styles"
import CompanyLogo from "../../../../../assets/images/logo.png"

export function LogoImage() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="center"
        source={CompanyLogo}
      />
    </View>
  )
}
