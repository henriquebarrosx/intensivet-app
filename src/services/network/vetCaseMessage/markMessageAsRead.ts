import { API } from "../../axios";
import { AxiosResponse } from "axios";


interface VetCaseMessageParams {
  bearerToken: string;
  routeParams: { vetCaseId: number; },
}

export const markMessagesAsRead = async (params: VetCaseMessageParams): Promise<AxiosResponse<void>> => {
  const { routeParams, bearerToken } = params;

  return await API.get(`/vet_cases/${routeParams.vetCaseId}/unread_messages`, {
    headers: { Authorization: bearerToken }
  });
}