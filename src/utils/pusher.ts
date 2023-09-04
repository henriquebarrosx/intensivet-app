import { User } from "../schemas/Account";
import { CHANNELS } from "../schemas/Pusher";

/*
  Admin account should listen changes from admin channel.
  But, when a admin send a new message, the clinic channel its used.

  The other role accounts has the same behavior, but the opposite channels.
*/
export function channelName(account: Partial<User>): string {
  const isCurrentAccountAdmin = account.current_account?.role === 'admin';
  return isCurrentAccountAdmin ? CHANNELS.ADMIN : CHANNELS.CLINIC + account?.clinic?.id;
}