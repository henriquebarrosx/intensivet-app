import { useVetCase } from "../../context/VetCaseContext"

export const useViewModel = () => {
  const vetCaseContext = useVetCase()

  function getPetNameWithVetCaseId(): string {
    return `#${vetCaseContext.data.id} ${vetCaseContext.data.pet.name}`
  }

  return {
    subtitle: getPetNameWithVetCaseId(),
    clinicName: vetCaseContext.data.clinic.fantasy_name,
    isPuctualCase: !vetCaseContext.data.category.full_case,
    clinicThumbnail: vetCaseContext.data.clinic?.thumbnail?.service_url,
  }
}