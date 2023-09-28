import { useState } from "react"
import { useVetCase } from "../../context/VetCaseContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { localDate } from "../../infra/adapters/local-date-adapter"
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"
import { LocalDateFormatEnum } from "../../infra/adapters/local-date-adapter/index.gateway"

export const useViewModel = () => {
    const { vetCase } = useVetCase()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingIndicator] = useState(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            console.log(
                "[VET CASE] GET Requested",
                { endpoint: `/api/v2/vet_cases/${vetCase.id}` }
            )

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
    }

    async function handleFetchVetCaseData(): Promise<void> {
        startLoadingEffect()
        await fetchVetCaseDetails()
        stopLoadingEffect()
    }

    function startLoadingEffect(): void {
        shouldDisplayLoadingIndicator(true)
    }

    function stopLoadingEffect(): void {
        shouldDisplayLoadingIndicator(false)
    }

    function getBirthDate(): string {
        if (vetCaseDetails?.vet.birth_date) {
            return localDate.format(
                vetCaseDetails.vet.birth_date,
                LocalDateFormatEnum.date
            )
        }

        return "---"
    }

    return {
        handleFetchVetCaseData,
        isLoadingIndicatorDisplayed,
        vetBirthDate: getBirthDate(),
        vetCrmv: vetCaseDetails?.vet.crmv,
        vetPhoneNumber: vetCaseDetails?.vet.phone,
        avatarUri: vetCaseDetails?.vet?.thumbnail,
        subtitle: vetCaseDetails?.vet?.email || "---",
        title: vetCaseDetails?.vet?.doctor_name || "---",
    }
}