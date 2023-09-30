import { useState } from "react"

import { useVetCase } from "../../context/VetCaseContext"
import { useServices } from "../../context/ServicesContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"

export function useViewModel() {
    const { vetCase } = useVetCase()
    const { vetCaseService } = useServices()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            shouldDisplayLoadingFeedback(true)
            const response = await vetCaseService.findOne(vetCase.id)
            setVetCaseDetails(response)
        }

        finally {
            shouldDisplayLoadingFeedback(false)
        }
    }

    return {
        vetCaseDetails,
        fetchVetCaseDetails,
        isLoadingIndicatorDisplayed,
    }
}