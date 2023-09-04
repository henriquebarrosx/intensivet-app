import { useState } from "react";
import { date } from "../../utils/dates";
import { API } from "../../services/axios";
import { useVetCase } from "../../context/VetCaseContext";
import { VetCaseDetails } from "../../schemas/VetCaseDetails";

export const useViewModel = () => {
  const { vetCase } = useVetCase();

  const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>();
  const [isLoadingIndicatorDisplayed, shouldDisplayLoadingIndicator] = useState(true);

  async function fetchVetCaseDetails(): Promise<void> {
    const { data } = await API.get(`/api/v2/vet_cases/${vetCase.id}`);
    setVetCaseDetails(data);
  }

  async function handleFetchVetCaseData(): Promise<void> {
    startLoadingEffect();
    await fetchVetCaseDetails();
    stopLoadingEffect();
  }

  function startLoadingEffect(): void {
    shouldDisplayLoadingIndicator(true);
  }

  function stopLoadingEffect(): void {
    shouldDisplayLoadingIndicator(false);
  }

  function getPetIconName(): string {
    return vetCaseDetails?.pet.species === 'Canina' ? 'dog' : 'cat';
  }

  function getPetGender(): string {
    if (vetCaseDetails?.pet.gender) {
      return vetCaseDetails?.pet.gender === 'male' ? 'MACHO' : 'FÊMEA'
    }

    return '---';
  }

  function getPetBirthDate(): string {
    if (vetCaseDetails?.pet.birth_date) {
      return date(vetCaseDetails?.pet.birth_date);
    }

    return '---';
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