import React, { memo } from "react"
import { RefreshControl, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent } from "react-native"

import VetCase from "../VetCase"
import { styles } from "./styles"
import { EmptyVetCaseList } from "../ListEmpty"
import { isCloseToTop } from "../../../utils/listView"
import { useVetCasesContext } from "../../../context/VetCasesContext"

type Props = {
    touchTheTop: (touched: boolean) => void
}

export default memo(({ touchTheTop }: Props) => {
    const vetCasesContext = useVetCasesContext()

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        isCloseToTop(nativeEvent) ? touchTheTop(true) : touchTheTop(false)
    }

    return (
        <VirtualizedList
            ref={vetCasesContext.listViewRef}
            initialNumToRender={12}
            data={vetCasesContext.items}
            getItemCount={() => vetCasesContext.items.length}
            getItem={(items, index) => items[index]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <VetCase item={item} />}
            style={styles.listview}
            onEndReached={vetCasesContext.paginate}
            onEndReachedThreshold={0.7}
            onScroll={onScroll}
            ListEmptyComponent={EmptyVetCaseList}
            refreshControl={<RefreshControl refreshing={false} onRefresh={vetCasesContext.findAll} />}
        />
    )
})
