import { useContext } from 'react';
import axios, { AxiosError } from 'axios';

import { Session } from '../../../models/Session';
import { navigationRef } from '../../../utils/navigation';
import { UserContext } from '../../../context/UserContext';
import { useErrorsFeedback } from '../../../context/ErrorsFeedbackContext';
import { useVetCaseIndicators } from '../../../context/VetCaseIndicators';

export const useBadfullyResponse = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { makeRefreshVetCaseList, makeTryAgainButtonVisible } = useVetCaseIndicators();
  const { makeError500Visible, makeErrorModalVisible, makeNoConnectionVisible } = useErrorsFeedback();

  const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
    notAuthorized(error);
    internalServerError(error);
    noInternetConnection(error);

    return Promise.reject(error);
  };

  const notAuthorized = async (error: any): Promise<void> => {
    const notAuthorized = error?.response?.status === 401;

    if (notAuthorized && screenNotFocused('Login')) {
      await new Session().clear();
      setUserData(null);
    }
  }

  const noInternetConnection = (error: any): void => {
    if (error?.toJSON()?.message === 'Network Error') {
      makeErrorModalVisible(true);
      makeNoConnectionVisible(true);
      makeRefreshVetCaseList(false);
      makeTryAgainButtonVisible(true);
    }
  }

  const internalServerError = (error: any): void => {
    if (error?.response?.status === 500) {
      makeError500Visible(true);
      makeErrorModalVisible(true);
      makeRefreshVetCaseList(false);
      makeTryAgainButtonVisible(true);
    }
  }

  return { onErrorResponse }
}

const screenNotFocused = (expectedScreenName: string): boolean => {
  const currentScreenName = navigationRef.current?.getCurrentRoute()?.name!;
  return expectedScreenName !== currentScreenName;
};
