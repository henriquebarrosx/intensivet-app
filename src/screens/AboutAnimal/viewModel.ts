import { useState } from "react"
import { useServices } from "../../context/ServicesContext"
import { VetCaseDetails } from "../../schemas/VetCaseDetails"
import { useVetCaseContext } from "../../context/VetCaseContext"
import { localDate } from "../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../infra/adapters/local-date-adapter/index.gateway"

export const useViewModel = () => {
    const { vetCaseService } = useServices()
    const vetCaseContext = useVetCaseContext()

    const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>()
    const [isLoadingIndicatorDisplayed, shouldDisplayLoadingIndicator] = useState(true)

    async function handleFetchVetCaseData(): Promise<void> {
        try {
            shouldDisplayLoadingIndicator(true)

            const response = await vetCaseService.findOne(vetCaseContext.data.id)
            setVetCaseDetails(response)
        }

        finally {
            shouldDisplayLoadingIndicator(false)
        }
    }

    function getPetIconName(): string {
        return vetCaseDetails?.pet.species === 'Canina' ? 'dog' : 'cat'
    }

    function getPetGender(): string {
        if (vetCaseDetails?.pet.gender) {
            return vetCaseDetails?.pet.gender === 'male' ? 'MACHO' : 'FÊMEA'
        }

        return '---'
    }

    function getPetBirthDate(): string {
        if (vetCaseDetails?.pet.birth_date) {
            return localDate.format(
                vetCaseDetails.pet.birth_date,
                LocalDateFormatEnum.date
            )
        }

        return '---'
    }

    return {
        handleFetchVetCaseData,
        petGender: getPetGender(),
        isLoadingIndicatorDisplayed,
        petIconName: getPetIconName(),
        petBirthDate: getPetBirthDate(),
        petSpecies: vetCaseDetails?.pet.species,
        petName: vetCaseDetails?.pet.name || '---',
        petBreed: vetCaseDetails?.pet.breed || '---',
        petWeight: vetCaseDetails?.pet_anamnesis?.weight,
    }
}