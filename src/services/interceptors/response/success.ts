import { AxiosResponse } from "axios";
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext";
import { useVetCaseIndicators } from "../../../context/VetCaseIndicators";

export const useSuccessfullyResponse = () => {
  const { makeTryAgainButtonVisible } = useVetCaseIndicators();
  const { makeError500Visible, makeErrorModalVisible,makeNoConnectionVisible } = useErrorsFeedback()

  const onSuccessResponse = (response: AxiosResponse<any>): Promise<any> => {
    makeError500Visible(false);
    makeErrorModalVisible(false);
    makeNoConnectionVisible(false);
    makeTryAgainButtonVisible(false);
    makeTryAgainButtonVisible(false);

    return Promise.resolve(response);
  };

  return { onSuccessResponse }
}