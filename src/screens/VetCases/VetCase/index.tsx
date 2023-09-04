import moment from "moment";
import "moment/locale/pt-br";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useContext, useMemo } from "react";

import SlaMessages from "./SlaMessages";
import ReceivedMessages from "./ReceivedMessages";
import { OrderBy, VetCase } from "../../../schemas/VetCase";
import { useVetCase } from "../../../context/VetCaseContext";
import { OrderVetCaseContext } from "../../../context/OrderVetCases";

export interface Props {
  item: VetCase;
}

export default memo(({ item }: Props) => {
  const navigation = useNavigation();

  const { setVetCase } = useVetCase();
  const { selected } = useContext(OrderVetCaseContext);

  function navigateToChat(): void {
    setVetCase(item);
    
    navigation.navigate('Chat', {
      vetCaseId: item.id,
      petName: item.pet.name,
      clinicFantasyName: item.clinic.fantasy_name,
    });
  }

  function getLastMessageTime(): string {
    const date = item?.last_message?.created_at || item.created_at;
    const isToday = moment(date).isSame(moment(), 'date');
    return isToday ? moment().format('HH:mm') : moment(date).format('DD/MM/YY')
  }

  const lastUpdate = getLastMessageTime();

  const thereIsUnreadMessages = useMemo(() => {
    return !!item.unread_messages;
  }, [item.unread_messages]);

  const timeStyle = useMemo(() => {
    return { color: thereIsUnreadMessages ? '#48BACC' : '#757575' };
  }, [thereIsUnreadMessages]);

  const Template = () => {
    return selected === OrderBy.LAST_MESSAGE 
      ? <ReceivedMessages
          vetCase={item}
          timeStyle={timeStyle}
          lastUpdate={lastUpdate}
          navigateToChat={navigateToChat}
          thereIsUnreadMessages={thereIsUnreadMessages}
        />
      : <SlaMessages vetCase={item} navigateToChat={navigateToChat} />
  };
  
  return <Template />
});
