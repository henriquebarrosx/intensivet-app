import { useContext, useState } from "react";

import { VetCase} from "../../../../schemas/VetCase";
import { UserContext } from "../../../../context/UserContext";
import { formattingRespondedAt, formattingSlaAt } from "../../../../utils/timers";

let countDown: NodeJS.Timeout;
const ONE_MINUTE: number = 60000;

export function useTimer(vetCase: VetCase) {
  const { isAdmin } = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState<string>(getCurrentTimer());

  const vetCaseTimer = isAdmin ? vetCase.sla_at: vetCase.responded_at;

  function getCurrentTimer(): string {
    if (vetCaseTimer) {
      return isAdmin
        ? formattingSlaAt(vetCase.sla_at)
        : formattingRespondedAt(vetCase.responded_at);
    }

    return '---';
  }

  function startStopWatch(): void {
    setTimeLeft(getCurrentTimer());

    countDown = setTimeout(() => {
      setTimeLeft(getCurrentTimer());
    }, ONE_MINUTE);
  }

  function stopStopWatch(): void {
    setTimeLeft('---');
    clearTimeout(countDown);
  }

  return { timeLeft, startStopWatch, stopStopWatch }
}
