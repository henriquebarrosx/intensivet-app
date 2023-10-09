import { useState } from "react"

import { useServices } from "../../context/ServicesContext"
import { EvidenceModel } from "../../schemas/VetCaseDetails"
import { useVetCaseContext } from "../../context/VetCaseContext"
import { useFileReader } from "../../app/react-hooks/file-reader"

export const useViewModel = () => {
    const fileReader = useFileReader()
    const { vetCaseService } = useServices()
    const vetCaseContext = useVetCaseContext()

    const [evidences, setEvidences] = useState<EvidenceModel[]>([])
    const [isFetchingEvidences, displayFetchFeedback] = useState<boolean>(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            displayFetchFeedback(true)
            const response = await vetCaseService.findOne(vetCaseContext.data.id)
            setEvidences([...response?.chat_evidences, ...response?.evidences])
        }

        finally {
            displayFetchFeedback(false)
        }
    }

    async function openEvidenceFile(evidence: EvidenceModel): Promise<void> {
        await fileReader.read(evidence.file_name, evidence.service_url)
    }

    function isEvidencesNotFoundTextVisible(): boolean {
        return evidences.length === 0 && !isFetchingEvidences
    }

    function getEvidenceIcon({ type }: { type: string }): string {
        if (type.endsWith('pdf')) {
            return 'file-pdf-box'
        }

        if (type.endsWith('csv') || type.endsWith('xlsx')) {
            return 'file-excel'
        }

        if (type.endsWith('docx')) {
            return 'word'
        }

        if (type.endsWith('mp3')) {
            return 'music'
        }

        if (type.startsWith('video')) {
            return 'video'
        }

        if (type.startsWith('image')) {
            return 'image'
        }

        return 'file'
    }

    return {
        evidences,
        getEvidenceIcon,
        openEvidenceFile,
        fetchVetCaseDetails,
        isFetchingEvidences,
        isEvidencesNotFoundTextVisible: isEvidencesNotFoundTextVisible(),
    }
}