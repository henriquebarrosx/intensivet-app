import React, { memo, useCallback } from 'react';
import { RefreshControl, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import VetCase from '../VetCase';
import { styles } from './styles';
import { useVetCaseList } from '../script';
import { EmptyVetCaseList } from '../ListEmpty';
import { isCloseToTop } from '../../../utils/listView';
import { useVetCases } from '../../../context/VetCasesContext';
import { VetCase as VetCaseModel } from '../../../schemas/VetCase';

interface ListViewProps {
  touchTheTop: (touched: boolean) => void;
}

export default memo(({ touchTheTop }: ListViewProps) => {
  const { vetCases, virtualizedListRef } = useVetCases();
  const { onPaginate, fetchVetCaseList } = useVetCaseList();

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    isCloseToTop(nativeEvent) ? touchTheTop(true) : touchTheTop(false);
  };

  const renderItem = useCallback(({ item }: any) => (
    <VetCase item={item} />
  ), []);

  const keyExtractor = useCallback((item: VetCaseModel) => {
    return item.id.toString();
  }, []);

  const getItem = useCallback((items: VetCaseModel[], index: number) => {
    return items[index];
  }, []);

  return (
    <VirtualizedList
      data={vetCases}
      getItem={getItem}
      onScroll={onScroll}
      initialNumToRender={12}
      renderItem={renderItem}
      ref={virtualizedListRef}
      onEndReached={onPaginate}
      style={styles.vetCaseList}
      onEndReachedThreshold={0.7}
      keyExtractor={keyExtractor}
      getItemCount={() => vetCases.length}
      ListEmptyComponent={EmptyVetCaseList}
      refreshControl={<RefreshControl refreshing={false} onRefresh={fetchVetCaseList} />}
    />
  );
});
