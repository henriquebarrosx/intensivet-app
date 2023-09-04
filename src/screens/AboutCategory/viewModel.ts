import { useState } from "react";
import { API } from "../../services/axios";
import { useVetCase } from "../../context/VetCaseContext";
import { VetCaseDetails } from "../../schemas/VetCaseDetails";

export const useViewModel = () => {
  const { vetCase } = useVetCase();

  const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>();
  const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true);

  async function fetchVetCaseDetails(): Promise<void> {
    shouldDisplayLoadingFeedback(true);

    const { data } = await API.get(`/api/v2/vet_cases/${vetCase.id}`);
    setVetCaseDetails(data);

    shouldDisplayLoadingFeedback(false);
  }

  function getVetCaseCategory(): string {
    return vetCaseDetails?.category.name || '---';
  }

  function getVetCaseCategoryDescription(): string {
    return vetCaseDetails?.category.description || '---';
  }

  function getVetCasePriority(): string {
    if (vetCaseDetails?.priority?.value) {
      return `Classe ${vetCaseDetails?.priority?.value} \n\n ${vetCaseDetails?.priority?.description}`;
    }

    return '---';
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