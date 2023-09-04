
export interface MessageNotification {
  to: string;
  sound: string;
  title: string;
  body: string;
  data?: object;
}