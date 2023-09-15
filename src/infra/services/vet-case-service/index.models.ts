import { Pagination } from "../../../schemas/Pagination"
import { VetCaseModel } from "../../../schemas/VetCase";

export type FindAllVetCasesResponse = {
    pagination: Pagination;
    vet_cases: VetCaseModel[]
}