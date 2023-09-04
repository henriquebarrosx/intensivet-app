export interface VetCaseChannel {
  id: number;
  body: string; // Mensagem com HTML
  message: string; // Mensagem sem HTML
  is_admin: boolean;
  is_sender: boolean;
  vet_case_id: number;
  created_at: number;
  updated_at: number;
  message_type: string;
  account:  {
    id: number;
    doctor_name: string;
  },
}