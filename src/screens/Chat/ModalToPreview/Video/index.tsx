import Modal from "react-native-modal"
import { TouchableOpacity } from "react-native"
import { View, Text, StatusBar } from "react-native"
import React, { Fragment, memo, useContext } from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import VideoPlayer from "../../../../components/VideoPlayer"
import { MessageContext } from "../../../../context/MessageContext"
import { localDate } from "../../../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../../../infra/adapters/local-date-adapter/index.gateway"

function VideoPreview() {
    const { displayingVideoPreview } = useContext(MessageContext)
    return displayingVideoPreview ? <Template /> : null
}

function Template() {
    const {
        message,
        setMessage,
        displayVideoPreview,
        displayingVideoPreview
    } = useContext(MessageContext)

    function closeModal() {
        setMessage(null)
        displayVideoPreview(false)
    }

    const createdAtDateTime = localDate.format(
        message?.createdAt,
        LocalDateFormatEnum.datetime
    )

    return (
        <Fragment>
            <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

            <Modal
                propagateSwipe
                style={styles.modal}
                animationIn="fadeIn"
                animationOut="fadeOut"
                swipeDirection={"right"}
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
                            <Text style={styles.doctorName}>{message?.account.doctorName}</Text>
                            <Text style={styles.timestamp}>{createdAtDateTime}</Text>
                        </View>
                    </View>

                    <VideoPlayer uri={message?.attachment.uri!} />
                </View>
            </Modal>
        </Fragment>
    )
}

export default memo(VideoPreview)
