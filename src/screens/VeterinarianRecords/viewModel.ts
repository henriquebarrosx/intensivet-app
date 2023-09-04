import { useState } from "react";

import { API } from "../../services/axios";
import { useVetCase } from "../../context/VetCaseContext";
import { VetCaseDetails } from "../../schemas/VetCaseDetails";

export function useViewModel() {
  const { vetCase } = useVetCase();
  
  const [vetCaseDetails, setVetCaseDetails] = useState<VetCaseDetails>();
  const [isLoadingIndicatorDisplayed, shouldDisplayLoadingFeedback] = useState(true);

  async function fetchVetCaseDetails(): Promise<void> {
    shouldDisplayLoadingFeedback(true);

    const { data } = await API.get(`/api/v2/vet_cases/${vetCase.id}`);
    setVetCaseDetails(data);

    shouldDisplayLoadingFeedback(false);
  }

  return {
    vetCaseDetails,
    fetchVetCaseDetails,
    isLoadingIndicatorDisplayed,
  }
}