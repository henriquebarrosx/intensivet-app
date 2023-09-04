import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../utils/colors';
import { useErrorsFeedback } from '../context/ErrorsFeedbackContext';

const FALLBACK_IMAGE = require('../assets/network.png');

const NetworkConnection = () => {
  const { closeUnexpectedErrorModal } = useErrorsFeedback();

  const onTryAgainTap = () => {
    closeUnexpectedErrorModal({ toRefresh: false });
  };

  return (
    <View style={styles.root}>
      <Image style={styles.fallbackPicture} source={FALLBACK_IMAGE} />

      <Text allowFontScaling={false} style={styles.title}>
        Sem conexão!
      </Text>

      <Text allowFontScaling={false} style={styles.errorMessage}>
        {`Por favor, cheque sua conexão com a internet \n e tente novamente`}
      </Text>

      <TouchableOpacity onPress={onTryAgainTap} style={styles.tryAgainBtn}>
        <Text allowFontScaling={false} style={styles.tryAgainText}>
          Fechar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  fallbackPicture: {
    width: 300,
    height: 260,
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray,
    textAlign: 'center',
  },
  tryAgainBtn: {
    height: 58,
    borderRadius: 7,
    fontWeight: '600',
    marginVertical: 50,
    alignItems: 'center',
    marginHorizontal: 24,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  tryAgainText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default memo(NetworkConnection);
