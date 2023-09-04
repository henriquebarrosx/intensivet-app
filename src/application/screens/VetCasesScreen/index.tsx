import { withGlobalProviders } from "../../shared/react-hooks/withGlobalProviders"
import { useDeviceNavigation } from "../../shared/react-hooks/useDeviceNavigation"
import { ScreenWrapper } from "../../shared/components/ScreenWrapper"
import { Tabs } from "../../shared/components/Tabs"
import { Header } from "./components/Header"

export const VetCasesScreenHOC = withGlobalProviders(VetCasesScreen)

function VetCasesScreen() {
    const navigation = useDeviceNavigation()
    const navigateToProfile = () => navigation.navigate("Profile")

    const tabs = [
        { key: "last_message", label: "Mensagens Recebidas" },
        { key: "by_sla", label: "Tempo da SLA" },
    ]

    return (
        <ScreenWrapper>
            <Header onAvatarPress={navigateToProfile} />
            <Tabs tabs={tabs} onTabChange={() => { }} />
        </ScreenWrapper>
    )
}