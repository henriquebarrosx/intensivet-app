import { useVetCaseIndicators } from "../../../../context/VetCaseIndicators"
import { useErrorsFeedback } from "../../../../context/ErrorsFeedbackContext"

export function useSuccessfullyResponse() {
    const { makeTryAgainButtonVisible } = useVetCaseIndicators();
    const { makeError500Visible, makeErrorModalVisible, makeNoConnectionVisible } = useErrorsFeedback()

    function onSuccess(response: any): Promise<any> {
        makeError500Visible(false);
        makeErrorModalVisible(false);
        makeNoConnectionVisible(false);
        makeTryAgainButtonVisible(false);
        makeTryAgainButtonVisible(false);

        return Promise.resolve(response);
    };

    return { onSuccess }
}