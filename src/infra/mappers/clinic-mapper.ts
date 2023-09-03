import { Clinic } from "../../domain/entities/Clinic"
import { ClinicModel } from "../services/session/index.models"

export class ClinicMapper {
    private constructor() { }

    static map(clinicData: ClinicModel): Clinic {
        const clinic = new Clinic()
        const hasClinicData = !!clinicData && Object.keys(clinicData).length > 0

        if (hasClinicData) {
            clinic.withId(clinicData.id)
                .withAccountId(clinicData.account_id)
                .withCnpj(clinicData.cnpj)
                .withCep(clinicData.cep)
                .withCity(clinicData.city)
                .withFantasyName(clinicData.fantasy_name)
                .withCompanyName(clinicData.company_name)
                .withAddressStreet(clinicData.address_street)
                .withAddressDistrict(clinicData.address_district)
                .withAddressComplement(clinicData.address_complement)
                .withAddressNumber(clinicData.address_number)
                .withPhone1(clinicData.phone)
                .withPhone2(clinicData.phone2)
                .withPhone3(clinicData.phone3)
                .withCreatedAt(clinicData.created_at)
                .withUpdatedAt(clinicData.updated_at)
                .withDeletedAt(clinicData.deleted_at)
        }

        return clinic
    }
}