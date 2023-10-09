
export interface Vet {
	id: number;
	crmv: string;
	phone: string;
	email: string;
	birth_date: string;
	doctor_name: string;
	thumbnail?: any;
}

export interface Category {
	name: string;
	full_case: boolean;
	description: string;
}

export interface Priority {
	value?: any;
	description?: any;
}

export interface Pet {
	id: number;
	name: string;
	gender: string;
	breed: string;
	birth_date: string;
	species: string;
}

export interface PetAnamnesis {
	id: number;
	vet_case_id: number;
	vet_id: number;
	clinical_entry?: any;
	first_appointment_date?: any;
	internment_date?: any;
	weight: string;
	consult_motivation: string;
	clinical_history?: any;
	capum_scene?: any;
	capum_allergies?: any;
	capum_past?: any;
	capum_last_meal?: any;
	diagnostic_hypothesis_1?: any;
	diagnostic_hypothesis_2?: any;
	diagnostic_hypothesis_3?: any;
	diagnostic_hypothesis_4?: any;
	acvim_classification?: any;
	iris_classification?: any;
	oncologia?: any;
	diabetes?: any;
	get_glicemia?: any;
	glicemia?: any;
	hiperadrenocorticismo?: any;
	hipotiroidismo?: any;
	leishmaniose?: any;
	hemoparasitose?: any;
	infectious_diseases?: any;
	heart_rate?: any;
	respiratory_frequency?: any;
	consciousness?: any;
	tpc?: any;
	get_pas?: any;
	get_pad?: any;
	get_lactato?: any;
	lactato?: any;
	pam?: any;
	rectal_temperature?: any;
	peripheral_temperature?: any;
	mucous?: any;
	oximetria?: any;
	get_oximetria?: any;
	glucose?: any;
	total_proteins?: any;
	get_hematocrito?: any;
	hematocrito?: any;
	albumina?: any;
	get_albumina?: any;
	plaquetas?: any;
	background?: any;
	activity?: any;
	recomendations?: any;
	pad?: any;
	pas?: any;
	plaquetas_quantity?: any;
	proteinas_totais?: any;
	created_at: Date;
	updated_at: Date;
	anamnesis_work_time?: any;
	get_pas_type?: any;
	get_pad_type?: any;
	another_infectious_diseases?: any;
}

export interface Address {
	cep: string;
	address_street: string;
	state: string;
	city: string;
}

export interface Clinic {
	id: number;
	cnpj: string;
	phone: string;
	email: string;
	fantasy_name: string;
	thumbnail?: any;
	address: Address;
}

export interface VetCaseDetails {
	id: number;
	vet: Vet;
	category: Category;
	priority: Priority;
	pet: Pet;
	pet_anamnesis: PetAnamnesis;
	clinic: Clinic;
	evidences: EvidencesType[];
	chat_evidences: EvidencesType[];
	started_at: Date;
	responded_at?: any;
	created_at: Date;
	updated_at: Date;
}

export type EvidencesType = {
	type: string
	file_name: string
	service_url: string
	video_thumbnail_url?: string
}
