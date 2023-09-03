import { Vet } from "../../domain/entities/Vet"
import { VetModel } from "../services/session/index.models"

export class VetMapper {
    private constructor() { }

    static map(vetData: VetModel): Vet {
        const vet = new Vet()
        const hasVetData = !!vetData && Object.keys(vetData).length > 0

        if (hasVetData) {
            vet.withId(vetData.id)
                .withAccountId(vetData.account_id)
                .withClinicId(vetData.clinic_id)
                .withBirthDate(vetData.birth_date)
                .withCrmv(vetData.crmv)
                .withFirstName(vetData.first_name)
                .withLastName(vetData.last_name)
                .withPhone(vetData.phone)
                .withGender(vetData.gender)
                .withCreatedAt(vetData.created_at)
                .withUpdatedAt(vetData.updated_at)
                .withDeletedAt(vetData.deleted_at)
        }

        return vet
    }
}