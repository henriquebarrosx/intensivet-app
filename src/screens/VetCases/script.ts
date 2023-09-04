import { AxiosResponse } from "axios";
import { OrderBy, VetCase } from '../../schemas/VetCase';
import { PaginationType } from "../../schemas/Pagination";
import { useVetCases } from "../../context/VetCasesContext";
import { fetchVetCases } from '../../services/network/vetCase';
import { useVetCaseIndicators } from "../../context/VetCaseIndicators";

interface VetCasesResponse {
  vet_cases: VetCase[];
  pagination: PaginationType;
}

export function useVetCaseList() {
  const { makeRefreshVetCaseList } = useVetCaseIndicators();
  const { setVetCases, pagination, setPagination } = useVetCases();

  async function fetchVetCaseList(page = 1, orderBy = OrderBy.LAST_MESSAGE): Promise<void> {
    startFetchingVetCaseListFeedback();

    fetchVetCases({ page, orderBy })
      .then(updateVetCaseList)
      .catch(handleBadCallbacks)
      .finally(stopFetchingVetCaseListFeedback)
  }

  function updateVetCaseList({ data }: AxiosResponse<VetCasesResponse>): void {
    setVetCases(data.vet_cases);
    setPagination(data?.pagination);
  }

  function startFetchingVetCaseListFeedback(): void {
    makeRefreshVetCaseList(true);
  }

  function stopFetchingVetCaseListFeedback(): void {
    makeRefreshVetCaseList(false);
  }

  function handleBadCallbacks(): void {
    setVetCases([]);
  }

  function onPaginate(): void {
    if (pagination.next) {
      fetchVetCaseList(pagination.next);
    }
  };

  return { fetchVetCaseList, onPaginate }
}