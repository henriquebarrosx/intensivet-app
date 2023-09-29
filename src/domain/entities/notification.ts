import { Notification as NotificationEvent } from "expo-notifications"

export class Notification {
    constructor(private readonly event?: NotificationEvent) { }

    getTitle() {
        if (!this.event) {
            throw new Error(
                "notification param not found",
                { cause: "event not found" }
            )
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
        if (!vetCaseId) throw new Error("vetCaseId param not found")
        return this.getVetCaseId() !== vetCaseId
    }
}