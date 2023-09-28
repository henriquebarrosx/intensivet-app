import { useState } from "react"

import { useVetCase } from "../../context/VetCaseContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { VetCaseService } from "../../infra/services/vet-case-service"

export const useViewModel = () => {
    const { vetCase } = useVetCase()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true)

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

    async function handleFetchVetCaseData(): Promise<void> {
        await fetchVetCaseDetails()
    }

    function getAvatarUri(): string {
        if (isLoadingIndicatorDisplayed) {
            return ""
        }

        return vetCase.clinic?.thumbnail?.service_url || "https://i.imgur.com/limEHBp.png"
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