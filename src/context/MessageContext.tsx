import { WithChildren } from "../@types/common";
import { Message as MessageModel } from '../schemas/Message';
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface Message {
  message: MessageModel | null;
  setMessage: Dispatch<SetStateAction<MessageModel | null>>;
  
  displayingImagePreview: boolean;
  displayingVideoPreview: boolean;
  displayImagePreview: (isDisplaying: boolean) => void;
  displayVideoPreview: (isDisplaying: boolean) => void;
}

export const MessageContext = createContext(
  {} as Message
);

export const MessageProvider = ({ children }: WithChildren) => {
  const [message, setMessage] = useState<MessageModel | null>(null);
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
