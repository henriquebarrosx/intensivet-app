import React, {createContext, useContext, useState} from 'react';
import { WithChildren } from '../@types/common';

interface FileAttachmentModalType {
    isDisplayingModal: boolean;
    displayModal: (isOpen: boolean) => void;
}

export const FileAttachmentModalContext = createContext({} as FileAttachmentModalType);

export const FileAttachmentModalProvider = ({ children }: WithChildren) => {
    const [isDisplayingModal, displayModal] = useState<boolean>(false);

    return (
        <FileAttachmentModalContext.Provider value={{ displayModal, isDisplayingModal }}>
            {children}
        </FileAttachmentModalContext.Provider>
    );
};

export function useFileAttachmentModal() {
    const context = useContext(FileAttachmentModalContext)
    const isContextNotFound: boolean = Object.keys(context).length === 0

    if (isContextNotFound) {
        throw new Error("useFileAttachmentModal should be encapsulated by FileAttachmentModalProvider")
    }

    return context
}