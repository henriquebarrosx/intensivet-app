import { WithChildren } from "../@types/common";
import { Message } from "../domain/entities/message";
import { MessageModel as MessageModel } from '../schemas/Message';
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type MessageContextGateway = {
  message: Message | null
  setMessage: Dispatch<SetStateAction<Message | null>>;

  displayingImagePreview: boolean;
  displayingVideoPreview: boolean;
  displayImagePreview: (isDisplaying: boolean) => void;
  displayVideoPreview: (isDisplaying: boolean) => void;
}

export const MessageContext = createContext(null as MessageContextGateway);

export const MessageProvider = ({ children }: WithChildren) => {
  const [message, setMessage] = useState<Message | null>(null);
  const [displayingVideoPreview, displayVideoPreview] = useState(false);
  const [displayingImagePreview, displayImagePreview] = useState(false);

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        displayVideoPreview,
        displayImagePreview,
        displayingImagePreview,
        displayingVideoPreview,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
