import { useState } from "react"
import { TabContainer, Label, HorizontalScrollViewArea } from "./styles"

export function Tabs({ tabs, onTabChange }: Props) {
    const [selectedTab, updateSelectedTab] = useState<string>(() => tabs[0].key)

    function onSelect(key: string): void {
        updateSelectedTab(key)
        onTabChange(key)
    }

    function getSelectionState(key: string): boolean {
        return selectedTab === key
    }

    return (
        <HorizontalScrollViewArea showsHorizontalScrollIndicator={false}>
            {tabs.map(({ key, label }) => {
                const isSelected = getSelectionState(key)

                return (
                    <TabContainer
                        key={key}
                        isSelected={isSelected}
                        onPress={() => onSelect(key)}
                    >
                        <Label isSelected={isSelected}>
                            {label}
                        </Label>
                    </TabContainer>
                )
            })}
        </HorizontalScrollViewArea>
    )
}

type Props = {
    tabs: TabProps[]
    onTabChange(key: string): void
}

type TabProps = {
    key: string
    label: string
}