import { API } from "../../axios";
import { AxiosResponse } from "axios";
import { MessageModel } from "../../../schemas/Message";
import { Pagination } from "../../../schemas/Pagination";

interface Params {
  routeParams: {
    page: number;
    vetCaseId: number;
  },
}

type Response = {
  pagination: Pagination;
  vet_case_messages: MessageModel[];
}

type FetchVetCaseMessageResponse = Promise<AxiosResponse<Response>>

export const fetchVetCaseMessages = (params: Params): FetchVetCaseMessageResponse => {
  const { routeParams } = params;
  return API.get(`/api/v2/vet_cases/${routeParams.vetCaseId}/vet_case_messages?page=${routeParams.page}`);
}

interface VetCaseMessageParams {
  routeParams: {
    vetCaseId: number;
    messageId: number;
  },
}

export const fetchVetCaseMessage = async (params: VetCaseMessageParams): Promise<AxiosResponse<MessageModel>> => {
  const { routeParams } = params;

  return API.get(`/api/v2/vet_cases/${routeParams.vetCaseId}/vet_case_messages/${routeParams.messageId}`);
}