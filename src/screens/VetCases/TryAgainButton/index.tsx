import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { useVetCaseList } from '../script';
import { useErrorsFeedback } from '../../../context/ErrorsFeedbackContext';
import { useVetCaseIndicators } from '../../../context/VetCaseIndicators';

function TryAgainButton() {
  const { fetchVetCaseList } = useVetCaseList();
  const { closeUnexpectedErrorModal } = useErrorsFeedback();
  const { isTryAgainButtonVisible } = useVetCaseIndicators();

  function refreshVetCaseList(): void {
    closeUnexpectedErrorModal({ toRefresh: true });
    fetchVetCaseList();
  };

  if (isTryAgainButtonVisible) {
    return (
      <TouchableOpacity onPress={refreshVetCaseList} style={styles.tryAgainBtn}>
        <Text allowFontScaling={false} style={styles.tryAgainText}>
          Tentar Novamente
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};

export default memo(TryAgainButton);
