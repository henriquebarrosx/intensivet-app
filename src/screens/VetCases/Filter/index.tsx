import React, { memo, useContext } from "react";

import { useVetCaseList } from "../script";
import { OrderBy } from "../../../schemas/VetCase";
import {useSession} from "../../../context/UserContext";
import { OrderVetCaseContext } from "../../../context/OrderVetCases";
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext";
import { Content, FilterOptionButton, FilterText, HorizontalScrollViewArea } from "./styles";

function VetCaseFilter() {
  const { isAdmin } = useSession();
  const { fetchVetCaseList } = useVetCaseList();
  const { closeUnexpectedErrorModal } = useErrorsFeedback();
  const { selected, changeSelected } = useContext(OrderVetCaseContext);

  async function orderByLastMessage(): Promise<void> {
    changeSelected(OrderBy.LAST_MESSAGE);
    closeUnexpectedErrorModal({ toRefresh: true });
    await fetchVetCaseList(1, OrderBy.LAST_MESSAGE);
  }

  async function orderBySla(): Promise<void> {
    changeSelected(OrderBy.SLA);
    closeUnexpectedErrorModal({ toRefresh: true });
    await fetchVetCaseList(1, OrderBy.SLA);
  }

  function getFilterLabelByAccountRole(): string {
    return isAdmin ? 'Tempo da SLA' : 'Categoria do caso'
  }

  return (
    <Content>
      <HorizontalScrollViewArea showsHorizontalScrollIndicator={false}>
        <FilterOptionButton onPress={orderByLastMessage} isSelected={selected === OrderBy.LAST_MESSAGE}>
          <FilterText isSelected={selected === OrderBy.LAST_MESSAGE}>
            Mensagens Recebidas
          </FilterText>
        </FilterOptionButton>

        <FilterOptionButton onPress={orderBySla} isSelected={selected === OrderBy.SLA}>
          <FilterText isSelected={selected === OrderBy.SLA}>
            {getFilterLabelByAccountRole()}
          </FilterText>
        </FilterOptionButton>
      </HorizontalScrollViewArea>
    </Content>
  );
}

export default memo(VetCaseFilter);
