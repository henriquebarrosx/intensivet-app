import React, { createContext, useContext, useState } from "react"
import { logger } from "../infra/adapters/logger-adapter"
import { WithChildren } from "../@types/common"

interface FileAttachmentModalType {
    isDisplayingModal: boolean
    displayModal: (isOpen: boolean) => void
}

export const FileAttachmentModalContext = createContext<FileAttachmentModalType>(null)

export const FileAttachmentModalProvider = ({ children }: WithChildren) => {
    const [isDisplayingModal, displayModal] = useState<boolean>(false)

    return (
        <FileAttachmentModalContext.Provider value={{ displayModal, isDisplayingModal }}>
            {children}
        </FileAttachmentModalContext.Provider>
    )
}

export function useFileAttachmentModal() {
    const context = useContext(FileAttachmentModalContext)

    if (!context) {
        const errorMessage = "useFileAttachmentModal should be encapsulated by FileAttachmentModalProvider"
        logger.error("REACT CONTEXT PROVIDER", errorMessage)
        throw new Error(errorMessage)
    }

    return context
}