import { useState } from "react"
import { useVetCase } from "../../context/VetCaseContext"
import { useServices } from "../../context/ServicesContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { localDate } from "../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../infra/adapters/local-date-adapter/index.gateway"

export const useViewModel = () => {
    const { vetCase } = useVetCase()
    const { vetCaseService } = useServices()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingIndicator] = useState(true)

    async function handleFetchVetCaseData(): Promise<void> {
        try {
            shouldDisplayLoadingIndicator(true)
            const response = await vetCaseService.findOne(vetCase.id)
            setVetCaseDetails(response)
        }

        finally {
            shouldDisplayLoadingIndicator(false)
        }
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