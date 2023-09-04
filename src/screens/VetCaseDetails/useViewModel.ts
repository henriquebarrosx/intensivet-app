import { useVetCase } from "../../context/VetCaseContext";

export const useViewModel = () => {
  const { vetCase } = useVetCase();

  function getPetNameWithVetCaseId(): string {
    return `#${vetCase.id} ${vetCase.pet.name}`;
  }

  return {
    subtitle: getPetNameWithVetCaseId(),
    clinicName: vetCase.clinic.fantasy_name,
    isPuctualCase: !vetCase.category.full_case,
    clinicThumbnail: vetCase.clinic?.thumbnail?.service_url,
  }
}