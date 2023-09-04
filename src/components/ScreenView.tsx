import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useCallback, useLayoutEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../utils/colors';
import { API } from '../services/axios';
import SomethingWentWrong from './Error500';
import { WithChildren } from '../@types/common';
import NetworkConnection from './NetworkConnection';
import { useVetCases } from '../context/VetCasesContext';
import { useErrorsFeedback } from '../context/ErrorsFeedbackContext';
import { useNetworkInterceptor } from '../services/interceptors';

const ScreenView = ({ children }: WithChildren) => {
  const {
    isErro500Visible,
    isErrorModalVisible,
    isNoConnectionVisible,
    closeUnexpectedErrorModal,
  } = useErrorsFeedback();

  const { setVetCases } = useVetCases();
  const { onRequest, onResponse } = useNetworkInterceptor();

  useLayoutEffect(
    useCallback(() => {
      API.interceptors.request.use(onRequest.onSuccess);
      API.interceptors.response.use(onResponse.onSuccessResponse, onResponse.onErrorResponse);
    }, [])
  );

  const closeUnexpectedErrorModalWithNoRefresh = () => {
    setVetCases([]);
    closeUnexpectedErrorModal({ toRefresh: false });
  };

  return (
    <Fragment>
      <StatusBar style={'dark'} translucent />

      <View style={styles.root}>
        {children}

        <Modal
          style={styles.modal}
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={isErrorModalVisible}
          onBackdropPress={closeUnexpectedErrorModalWithNoRefresh}
          onBackButtonPress={closeUnexpectedErrorModalWithNoRefresh}
        >
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={closeUnexpectedErrorModalWithNoRefresh}
            >
              <MaterialCommunityIcons
                size={35}
                name="close"
                color={colors.primary}
                style={styles.closeBtnIcon}
              />
            </TouchableOpacity>

            {isErro500Visible && <SomethingWentWrong />}
            {isNoConnectionVisible && <NetworkConnection />}
          </View>
        </Modal>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modal: {
    margin: 0,
    height: 300,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  closeBtn: {
    top: 20,
    right: 6,
    width: 40,
    height: 40,
    zIndex: 10,
    borderRadius: 100,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.snowPrimary,
  },
  closeBtnIcon: {
    alignSelf: 'center',
  },
});

export default ScreenView;
