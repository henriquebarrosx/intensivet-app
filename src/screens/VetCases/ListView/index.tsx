import React, { memo } from "react"
import { RefreshControl, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent } from "react-native"

import VetCase from "../VetCase"
import { styles } from "./styles"
import { useVetCaseList } from "../script"
import { EmptyVetCaseList } from "../ListEmpty"
import { isCloseToTop } from "../../../utils/listView"
import { useVetCases } from "../../../context/VetCasesContext"
import { VetCaseModel as VetCaseModel } from "../../../schemas/VetCase"

type Props = {
    touchTheTop: (touched: boolean) => void
}

export default memo(({ touchTheTop }: Props) => {
    const { vetCases, virtualizedListRef } = useVetCases()
    const { onPaginate, fetchVetCaseList } = useVetCaseList()

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        isCloseToTop(nativeEvent) ? touchTheTop(true) : touchTheTop(false)
    }

    return (
        <VirtualizedList
            ref={virtualizedListRef}
            initialNumToRender={12}
            data={vetCases}
            getItemCount={() => vetCases.length}
            getItem={(items, index) => items[index]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <VetCase item={item} />}
            style={styles.listview}
            onEndReached={onPaginate}
            onEndReachedThreshold={0.7}
            onScroll={onScroll}
            ListEmptyComponent={EmptyVetCaseList}
            refreshControl={<RefreshControl refreshing={false} onRefresh={fetchVetCaseList} />}
        />
    )
})
