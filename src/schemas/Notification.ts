import { Notification, NotificationBehavior } from 'expo-notifications';
export type NotificationHandler = (notification: Notification) => Promise<NotificationBehavior>