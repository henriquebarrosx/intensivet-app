import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation"

export function useDeviceNavigation() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return navigation
}
