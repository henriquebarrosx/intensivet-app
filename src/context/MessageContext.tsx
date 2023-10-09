import { WithChildren } from "../@types/common";
import { Message } from "../domain/entities/message";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type MessageContextGateway = {
  message: Message | null
  setMessage: Dispatch<SetStateAction<Message | null>>;
  displayingImagePreview: boolean;
  displayImagePreview: (isDisplaying: boolean) => void;
}

export const MessageContext = createContext(null as MessageContextGateway);

export const MessageProvider = ({ children }: WithChildren) => {
  const [message, setMessage] = useState<Message | null>(null);
  const [displayingImagePreview, displayImagePreview] = useState(false);

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        displayImagePreview,
        displayingImagePreview,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
