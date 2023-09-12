import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useVetCase } from "../../context/VetCaseContext";
import { markMessagesAsRead } from "../../services/network/vetCaseMessage/markMessageAsRead";

export const useViewModel = () => {
  const { vetCase } = useVetCase();
  const { sessionData: userData } = useContext(UserContext);

  const markVetCaseMessageAsRead = async () => {
    const accessToken = userData?.current_account.access_token!;

    await markMessagesAsRead({
      bearerToken: accessToken,
      routeParams: { vetCaseId: vetCase.id },
    });
  }

  return { markVetCaseMessageAsRead }
}