import { MessageModel } from "../../schemas/Message";
import { LastMessage, VetCaseModel } from "../../schemas/VetCase";

export const updateTotalUnreadMessagesAndLastMessage = (vetCase: VetCaseModel, lastMessage: MessageModel): VetCaseModel => {
  return {
    ...updateTotalUnreadMessagesFromVetCases(vetCase),
    last_message: updateLastMessage(lastMessage),
  }
}

export const updateTotalUnreadMessagesFromVetCases = (vetCase: VetCaseModel): VetCaseModel => {
  return { ...vetCase, unread_messages: 0 };
}

export const updateLastMessage = (lastMessage: MessageModel): LastMessage => {
  return {
    message: lastMessage.message,
    file_name: lastMessage.file_name,
    message_type: lastMessage.message_type,
  }
};