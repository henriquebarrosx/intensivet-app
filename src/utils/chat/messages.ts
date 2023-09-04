import { Message } from "../../schemas/Message";
import { LastMessage, VetCase } from "../../schemas/VetCase";

export const updateTotalUnreadMessagesAndLastMessage = (vetCase: VetCase, lastMessage: Message): VetCase => {
  return {
    ...updateTotalUnreadMessagesFromVetCases(vetCase),
    last_message: updateLastMessage(lastMessage),
  }
}

export const updateTotalUnreadMessagesFromVetCases = (vetCase: VetCase): VetCase => {
  return { ...vetCase, unread_messages: 0 };
}

export const updateLastMessage = (lastMessage: Message): LastMessage => {
  return {
    message: lastMessage.message,
    file_name: lastMessage.file_name,
    message_type: lastMessage.message_type,
  }
};