import React, { memo, useContext } from "react";

import { useVetCaseList } from "../script";
import { VetCaseOrderTypeEnum } from "../../../schemas/VetCase";
import { useSession } from "../../../context/UserContext";
import { OrderVetCaseContext } from "../../../context/OrderVetCases";
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext";
import { Content, FilterOptionButton, FilterText, HorizontalScrollViewArea } from "./styles";

function VetCaseFilter() {
  const { isAdmin } = useSession();
  const { fetchVetCaseList } = useVetCaseList();
  const { closeUnexpectedErrorModal } = useErrorsFeedback();
  const { selected, changeSelected } = useContext(OrderVetCaseContext);

  async function orderByLastMessage(): Promise<void> {
    changeSelected(VetCaseOrderTypeEnum.LAST_MESSAGE);
    closeUnexpectedErrorModal({ toRefresh: true });
    await fetchVetCaseList(1, VetCaseOrderTypeEnum.LAST_MESSAGE);
  }

  async function orderBySla(): Promise<void> {
    changeSelected(VetCaseOrderTypeEnum.SLA);
    closeUnexpectedErrorModal({ toRefresh: true });
    await fetchVetCaseList(1, VetCaseOrderTypeEnum.SLA);
  }

  function getFilterLabelByAccountRole(): string {
    return isAdmin ? 'Tempo da SLA' : 'Categoria do caso'
  }

  return (
    <Content>
      <HorizontalScrollViewArea showsHorizontalScrollIndicator={false}>
        <FilterOptionButton onPress={orderByLastMessage} isSelected={selected === VetCaseOrderTypeEnum.LAST_MESSAGE}>
          <FilterText isSelected={selected === VetCaseOrderTypeEnum.LAST_MESSAGE}>
            Mensagens Recebidas
          </FilterText>
        </FilterOptionButton>

        <FilterOptionButton onPress={orderBySla} isSelected={selected === VetCaseOrderTypeEnum.SLA}>
          <FilterText isSelected={selected === VetCaseOrderTypeEnum.SLA}>
            {getFilterLabelByAccountRole()}
          </FilterText>
        </FilterOptionButton>
      </HorizontalScrollViewArea>
    </Content>
  );
}

export default memo(VetCaseFilter);
