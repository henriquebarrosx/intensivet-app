import { Notification as NotificationEvent } from "expo-notifications"
import { logger } from "../../infra/adapters"

export class Notification {
    constructor(private readonly event?: NotificationEvent) { }

    getTitle() {
        if (!this.event) {
            const errorMessage = "notification event not found"
            logger.error("NOTIFICATION", errorMessage)
            throw new Error(errorMessage)
        }

        return this.event?.request.content.title || ""
    }

    getVetCaseId(): number | null {
        if (/#+[0-9]+,/.test(this.getTitle())) {
            return Number(this.getTitle().split(",")[0].split("#")[1])
        }

        return null
    }

    canDisplayNotification(vetCaseId: number) {
        return this.getVetCaseId() !== (vetCaseId || 0)
    }
}