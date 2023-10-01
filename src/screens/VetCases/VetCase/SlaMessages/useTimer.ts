import { useContext } from "react"

import { VetCaseModel } from "../../../../schemas/VetCase"
import { UserContext } from "../../../../context/UserContext"
import { localDate } from "../../../../infra/adapters/local-date-adapter"

export function useTimer(vetCase: VetCaseModel) {
    const { isAdmin } = useContext(UserContext)
    const period = localDate.toZone(isAdmin ? vetCase.sla_at : vetCase.responded_at)

    function getCurrentTimer(): string {
        if (!period) return "---"

        if (isAdmin) {
            const now = new Date()
            const isExpired = localDate.diffBetweenTimes(period, now, "seconds") <= 0
            if (isExpired) return "Em atraso"

            const minutesDifference = localDate.diffBetweenTimes(period, now, "minutes")

            const hours = Math.floor(minutesDifference / 60)
            const formattedHours = hours >= 10 ? hours : `0${hours}`

            const minutes = minutesDifference % 60
            const formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`

            return `${formattedHours}h${formattedMinutes}`
        }

        return localDate.fromNow(period)
    }

    return { timeLeft: getCurrentTimer() }
}
