import { useVetCases } from "../../context/VetCasesContext"
import { VetCaseOrderTypeEnum } from '../../schemas/VetCase'
import { useServices } from "../../context/ServicesContext"
import { useVetCaseIndicators } from "../../context/VetCaseIndicators"

export function useVetCaseList() {
    const vetCasesViewModel = useVetCases()
    const { vetCaseService } = useServices()
    const { makeRefreshVetCaseList } = useVetCaseIndicators()

    async function fetchVetCaseList(page = 1, orderBy = VetCaseOrderTypeEnum.LAST_MESSAGE): Promise<void> {
        try {
            makeRefreshVetCaseList(true)
            const [items, pagination] = await vetCaseService.findAll(page, orderBy)
            vetCasesViewModel.setVetCases(items)
            vetCasesViewModel.setPagination(pagination)
        }

        catch {
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