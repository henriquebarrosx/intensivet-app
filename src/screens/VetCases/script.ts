import { useVetCases } from "../../context/VetCasesContext"
import { VetCaseOrderTypeEnum } from '../../schemas/VetCase'
import { httpClient } from "../../infra/adapters/http-client-adapter"
import { useVetCaseIndicators } from "../../context/VetCaseIndicators"
import { VetCaseService } from "../../infra/services/vet-case-service"

export function useVetCaseList() {
    const vetCasesViewModel = useVetCases()
    const { makeRefreshVetCaseList } = useVetCaseIndicators()

    async function fetchVetCaseList(page = 1, orderBy = VetCaseOrderTypeEnum.LAST_MESSAGE): Promise<void> {

        try {
            makeRefreshVetCaseList(true)

            const vetCaseService = new VetCaseService(httpClient)
            const [items, pagination] = await vetCaseService.findAll(page, orderBy)

            vetCasesViewModel.setVetCases(items)
            vetCasesViewModel.setPagination(pagination)
        }

        catch (error) {
            console.error("[vet cases] error finding vet cases", error)
            vetCasesViewModel.setVetCases([])
        }

        finally {
            makeRefreshVetCaseList(false)
        }
    }

    function onPaginate(): void {
        if (vetCasesViewModel.pagination?.next) {
            fetchVetCaseList(vetCasesViewModel.pagination.next)
        }
    }

    return { fetchVetCaseList, onPaginate }
}