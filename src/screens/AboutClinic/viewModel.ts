import { useState } from "react"

import { useServices } from "../../context/ServicesContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { useVetCaseContext } from "../../context/VetCaseContext"

export const useViewModel = () => {
    const { vetCaseService } = useServices()
    const vetCaseContext = useVetCaseContext()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true)

    async function fetchVetCaseDetails(): Promise<void> {
        try {
            shouldDisplayLoadingFeedback(true)
            const response = await vetCaseService.findOne(vetCaseContext.data.id)
            setVetCaseDetails(response)
        }

        finally {
            shouldDisplayLoadingFeedback(false)
        }
    }

    async function handleFetchVetCaseData(): Promise<void> {
        await fetchVetCaseDetails()
    }

    function getAvatarUri(): string {
        if (isLoadingIndicatorDisplayed) {
            return ""
        }

        return vetCaseContext.data.clinic?.thumbnail?.service_url
            || "https://i.imgur.com/limEHBp.png"
    }

    function getLocation(): string {
        const state = vetCaseDetails?.clinic?.address?.state
        const city = vetCaseDetails?.clinic?.address?.city
        return state && city ? `${state}/${city}` : ""
    }

    return {
        handleFetchVetCaseData,
        avatarUri: getAvatarUri(),
        isLoadingIndicatorDisplayed,
        clinicLocation: getLocation(),
        clinicCnpj: vetCaseDetails?.clinic?.cnpj,
        clinicCep: vetCaseDetails?.clinic?.address?.cep,
        clinicPhoneNumber: vetCaseDetails?.clinic?.phone,
        clinicEmail: vetCaseDetails?.clinic.email || "---",
        clinicName: vetCaseDetails?.clinic.fantasy_name || "---",
        clinicAddress: vetCaseDetails?.clinic?.address?.address_street,
    }
}