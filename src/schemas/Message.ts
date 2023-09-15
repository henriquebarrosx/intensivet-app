import { Message } from "../domain/entities/message";
import { Account } from "./Account";

export interface MessageModel {
  id: number;
  file: string;
  message: string;
  file_name: string;
  is_admin: boolean;
  is_sender: boolean;
  created_at: string;
  vet_case_id: number;
  service_url: string;
  message_type: string;
  account: Pick<Account, "id" | "doctor_name" | "thumbnail">;
};

export type MessageElement = React.MemoExoticComponent<({ message }: { message: Message }) => JSX.Element>

export interface MessageType {
  text: MessageElement;
  file: MessageElement;
  image: MessageElement;
  video: MessageElement;
  audio: MessageElement;
}