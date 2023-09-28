import { useState } from "react"

import { useVetCase } from "../../context/VetCaseContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"

export function useViewModel() {
    const { vetCase } = useVetCase()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            shouldDisplayLoadingFeedback(true)

            const vetCaseService = new VetCaseService(httpClient)
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