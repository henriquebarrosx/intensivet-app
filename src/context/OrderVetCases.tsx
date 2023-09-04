import React, { Dispatch, useState, createContext, SetStateAction } from 'react';

import { OrderBy } from '../schemas/VetCase';
import { WithChildren } from '../@types/common';

interface OrderVetCaseContextType {
  selected: OrderBy;
  changeSelected: Dispatch<SetStateAction<OrderBy>>
}

export const OrderVetCaseContext = createContext<OrderVetCaseContextType>(
  {} as OrderVetCaseContextType,
);

export function OrderVetCaseProvider({children}: WithChildren) {
  const [selected, changeSelected] = useState<OrderBy>(OrderBy.LAST_MESSAGE);

  return (
    <OrderVetCaseContext.Provider value={{ selected, changeSelected }}>
      {children}
    </OrderVetCaseContext.Provider>
  );
}