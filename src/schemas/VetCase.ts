export interface VetCaseModel {
  vet: Vet;
  pet: Pet;
  id: number;
  status: string;
  sla_at: string;
  clinic: Clinic;
  priority: number;
  started_at: Date;
  updated_at: Date;
  category: Category;
  created_at: string;
  responded_at: string;
  unread_updates: number;
  unread_messages: number;
  last_message?: LastMessage;
}

export interface LastMessage {
  message_type: string;
  message: string | null;
  file_name?: string | null;
  created_at: string;
}

export enum MessageType {
  TEXT = 'text',
  AUDIO = 'audio',
  VIDEO = 'video',
  IMAGE = 'image',
  FILE = 'file',
}

export interface Vet {
  id: number;
  doctor_name: string;
}

export interface Category {
  id: number;
  name: string;
  full_case: boolean;
}

export interface Breed {
  name: string;
}

export interface Kind {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  kind: Kind;
  name: string;
  breed: Breed;
  gender: string;
}

export interface Clinic {
  id: number;
  fantasy_name: string;
  thumbnail: {
    filename: string,
    service_url: string,
  }
}

export enum VetCaseOrderTypeEnum {
  SLA = 'by_sla',
  LAST_MESSAGE = 'last_message'
}
