import { VirtualizedList } from 'react-native';

import React, {
  useRef,
  Dispatch,
  useState,
  RefObject,
  useContext,
  useCallback,
  createContext,
  SetStateAction,
} from 'react';

import { MessageModel } from '../schemas/Message';
import { WithChildren } from '../@types/common';
import { Pagination } from '../schemas/Pagination';
import { VetCaseModel as VetCaseModel } from '../schemas/VetCase';
import { updateTotalUnreadMessagesAndLastMessage } from '../utils/chat/messages';

interface VetCaseContextType {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  vetCases: VetCaseModel[];
  setVetCases: Dispatch<React.SetStateAction<VetCaseModel[]>>;
  updateVetCaseList: (lastMessage: MessageModel) => void;
  virtualizedListRef: RefObject<VirtualizedList<VetCaseModel>>;
}

export const VetCasesContext = createContext<VetCaseContextType>({} as VetCaseContextType);

export function VetCasesProvider({ children }: WithChildren) {
  const [vetCases, setVetCases] = useState<VetCaseModel[]>([]);
  const virtualizedListRef = useRef<VirtualizedList<VetCaseModel>>(null);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);

  const updateVetCaseList = useCallback((lastMessage: MessageModel) => {
    setVetCases((currentVetCaseList) => currentVetCaseList.map(vetCase => {
      const isTheVetCaseToBeUpdated = lastMessage.vet_case_id === vetCase.id;
      return isTheVetCaseToBeUpdated ? updateTotalUnreadMessagesAndLastMessage(vetCase, lastMessage) : vetCase;
    }));
  }, []);

  return (
    <VetCasesContext.Provider
      value={{
        vetCases,
        setVetCases,
        pagination,
        setPagination,
        updateVetCaseList,
        virtualizedListRef,
      }}
    >
      {children}
    </VetCasesContext.Provider>
  );
}

export const useVetCases = () => {
  const context = useContext(VetCasesContext);

  if (context) {
    return context;
  }

  throw new Error(
    'O contexto VetCasesContext precisa está contido na hierarquia de componentes!'
  );
};
