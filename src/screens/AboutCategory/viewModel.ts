import { useState } from "react";
import { useVetCase } from "../../context/VetCaseContext";
import { VetCaseDetails } from "../../schemas/VetCaseDetails";
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"

export const useViewModel = () => {
    const { vetCase } = useVetCase();

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>();
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true);

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            console.log(
                "[VET CASE] GET Requested",
                { endpoint: `/api/v2/vet_cases/${vetCase.id}` }
            )

            shouldDisplayLoadingFeedback(true)

            const vetCaseService = new VetCaseService(httpClient)
            const response = await vetCaseService.findOne(vetCase.id)

            setVetCaseDetails(response)
        }

        catch (error) {
            console.error(
                "[VET CASE] GET Requested",
                { endpoint: `/api/v2/vet_cases/${vetCase.id}` },
                { error }
            )
        }

        finally {
            shouldDisplayLoadingFeedback(false)
        }
    }

    function getVetCaseCategory(): string {
        return vetCaseDetails?.category.name || "---";
    }

    function getVetCaseCategoryDescription(): string {
        return vetCaseDetails?.category.description || "---";
    }

    function getVetCasePriority(): string {
        if (vetCaseDetails?.priority?.value) {
            return `Classe ${vetCaseDetails?.priority?.value} \n\n ${vetCaseDetails?.priority?.description}`;
        }

        return "---";
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