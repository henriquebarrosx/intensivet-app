import { useState } from "react"
import { useVetCase } from "../../context/VetCaseContext"
import { useServices } from "../../context/ServicesContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"

export const useViewModel = () => {
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

    function getVetCaseCategory(): string {
        return vetCaseDetails?.category.name || "---"
    }

    function getVetCaseCategoryDescription(): string {
        return vetCaseDetails?.category.description || "---"
    }

    function getVetCasePriority(): string {
        if (vetCaseDetails?.priority?.value) {
            return `Classe ${vetCaseDetails?.priority?.value} \n\n ${vetCaseDetails?.priority?.description}`
        }

        return "---"
    }

    return {
        vetCaseDetails,
        fetchVetCaseDetails,
        isLoadingIndicatorDisplayed,
        vetCasePriority: getVetCasePriority(),
        vetCaseCategory: getVetCaseCategory(),
        vetCaseCategoryDescription: getVetCaseCategoryDescription(),
    }
}