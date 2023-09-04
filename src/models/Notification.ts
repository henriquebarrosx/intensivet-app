import { NotificationHandler } from '../schemas/Notification';
import { Notification as NotificationEvent } from 'expo-notifications';

export class Notification {
  vetCaseId?: number;
  notification?: NotificationEvent;

  constructor(notification?: NotificationEvent, vetCaseId?: number) {
    this.vetCaseId = vetCaseId;
    this.notification = notification;
  }

  getNoficiationHandler(): NotificationHandler {
    if (this.shouldDisplayNotification()) {
      return this.getUnmuteNotificationConfig();
    }

    return this.getMuteNotificationConfig();
  }

  shouldDisplayNotification(): boolean {
    return this.getVetCaseId() !== this.vetCaseId;
  }

  getTitle(): string{
    return this.notification?.request.content.title || '';
  }

  notificationTitleMatchRegex(): boolean {
    return /#+[0-9]+,/.test(this.getTitle());
  }

  getVetCaseId(): number | null {
    if (this.notificationTitleMatchRegex()) {
      return Number(this.getTitle().split(",")[0].split("#")[1]);
    }

    return null;
  }

  getMuteNotificationConfig(): NotificationHandler {
    return async () => ({ shouldSetBadge: false, shouldShowAlert: false, shouldPlaySound: false });
  }

  getUnmuteNotificationConfig(): NotificationHandler {
    return async () => ({ shouldSetBadge: false, shouldShowAlert: true, shouldPlaySound: true });
  }
}