import React from "react";
import { View } from "react-native";

import Bubble from "./Bubble";
import { styles } from "./styles";
import { useMessage } from "./script";
import { Message as MessageModel } from "../../../../schemas/Message";

interface Props {
  message: MessageModel
}

export default function Message({ message }: Props) {
  const { Template } = useMessage(message);

  return (
    <View style={styles.messageContainer}>
      <Bubble
        isAdmin={message.is_admin}
        isSender={message.is_sender}
        createdAt={message.created_at}
        doctorName={message.account.doctor_name}>
        <Template message={message} />
      </Bubble>
    </View>
  )
}
