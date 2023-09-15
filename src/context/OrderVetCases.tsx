import React, { Dispatch, useState, createContext, SetStateAction } from 'react';

import { VetCaseOrderTypeEnum } from '../schemas/VetCase';
import { WithChildren } from '../@types/common';

interface OrderVetCaseContextType {
  selected: VetCaseOrderTypeEnum;
  changeSelected: Dispatch<SetStateAction<VetCaseOrderTypeEnum>>
}

export const OrderVetCaseContext = createContext<OrderVetCaseContextType>(
  {} as OrderVetCaseContextType,
);

export function OrderVetCaseProvider({ children }: WithChildren) {
  const [selected, changeSelected] = useState<VetCaseOrderTypeEnum>(VetCaseOrderTypeEnum.LAST_MESSAGE);

  return (
    <OrderVetCaseContext.Provider value={{ selected, changeSelected }}>
      {children}
    </OrderVetCaseContext.Provider>
  );
}