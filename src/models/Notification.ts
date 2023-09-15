import { NotificationHandler } from "../schemas/Notification"
import { Notification as NotificationEvent } from "expo-notifications"

export class Notification {
    constructor(
        public notification?: NotificationEvent,
        public vetCaseId?: number
    ) { }

    getNoficiationHandler(): NotificationHandler {
        if (this.shouldDisplayNotification()) {
            return this.getUnmuteNotificationConfig()
        }

        return this.getMuteNotificationConfig()
    }

    shouldDisplayNotification(): boolean {
        if (!this.vetCaseId) throw new Error("vetCaseId param not found")
        return this.getVetCaseId() !== this.vetCaseId
    }

    getTitle(): string {
        if (!this.notification) throw new Error("notification param not found")
        return this.notification?.request.content.title || ""
    }

    notificationTitleMatchRegex(): boolean {
        return /#+[0-9]+,/.test(this.getTitle())
    }

    getVetCaseId(): number | null {
        if (this.notificationTitleMatchRegex()) {
            return Number(this.getTitle().split(",")[0].split("#")[1])
        }

        return null
    }

    getMuteNotificationConfig(): NotificationHandler {
        return async () => ({ shouldSetBadge: false, shouldShowAlert: false, shouldPlaySound: false })
    }

    getUnmuteNotificationConfig(): NotificationHandler {
        return async () => ({ shouldSetBadge: false, shouldShowAlert: true, shouldPlaySound: true })
    }
}