import Modal from "react-native-modal";
import { TouchableOpacity } from 'react-native';
import { View, Text, StatusBar } from "react-native";
import React, { Fragment, memo, useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { styles } from "./styles";
import { datetime } from "../../../../utils/dates";
import VideoPlayer from "../../../../components/VideoPlayer";
import { MessageContext } from "../../../../context/MessageContext";

function VideoPreview() {
  const { displayingVideoPreview } = useContext(MessageContext);
  return displayingVideoPreview ? <Template /> : null;
}

function Template() {
  const {
    message,
    setMessage,
    displayVideoPreview,
    displayingVideoPreview
  } = useContext(MessageContext);

  function closeModal() {
    setMessage(null);
    displayVideoPreview(false);
  };

  const timeStamp = datetime(message?.created_at!);

  return (
    <Fragment>
      <StatusBar barStyle={"light-content"} />

      <Modal
        propagateSwipe
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        swipeDirection={'right'}
        onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        isVisible={displayingVideoPreview}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={closeModal}>
              <MaterialCommunityIcons size={42} color={"#FFF"} name="chevron-left" />
            </TouchableOpacity>

            <View style={styles.headerRightSide}>
              <Text style={styles.doctorName}>{message?.account.doctor_name}</Text>
              <Text style={styles.timestamp}>{timeStamp}</Text>
            </View>
          </View>

          <VideoPlayer uri={message?.service_url!} />
        </View>
      </Modal>
    </Fragment>
  );
}

export default memo(VideoPreview);
