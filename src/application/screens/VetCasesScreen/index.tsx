import { Text, View } from "react-native"
import { withGlobalProviders } from "../../shared/react-hooks/withGlobalProviders"

export const VetCasesScreenHOC = withGlobalProviders(VetCasesScreen)

function VetCasesScreen() {
    return (
        <View>
            <Text>Vet Cases</Text>
        </View>
    )
}