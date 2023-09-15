import React, { Dispatch, useState, useContext, createContext, useEffect } from 'react';

import { API } from '../services/axios';
import { UserContext } from './UserContext';
import { WithChildren } from '../@types/common';
import { VetCaseModel as VetCaseModel } from '../schemas/VetCase';

interface VetCaseContextType {
  vetCase: VetCaseModel;
  setVetCase: Dispatch<React.SetStateAction<VetCaseModel>>;
}

export const VetCaseContext = createContext<VetCaseContextType>({} as VetCaseContextType);

export function VetCaseProvider({ children }: WithChildren) {
  const [vetCase, setVetCase] = useState<VetCaseModel>({} as VetCaseModel);

  return (
    <VetCaseContext.Provider value={{ vetCase, setVetCase }}>
      {children}
    </VetCaseContext.Provider>
  );
}

export const useVetCase = () => {
  const context = useContext(VetCaseContext);

  if (context) {
    return context;
  }

  throw new Error("O contexto VetCaseContext precisa está contido na hierarquia de componentes!");
}