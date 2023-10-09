import Modal from "react-native-modal"
import { TouchableOpacity } from "react-native"
import { View, Text, StatusBar } from "react-native"
import React, { memo, Fragment, useContext } from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { MessageContext } from "../../../../context/MessageContext"
import { localDate } from "../../../../infra/adapters/local-date-adapter"
import { LocalDateFormatEnum } from "../../../../infra/adapters/local-date-adapter/index.gateway"

function ImagePreview() {
    const { displayingImagePreview } = useContext(MessageContext)
    return displayingImagePreview ? <Template /> : null
}

function Template() {
    const { message, setMessage, displayImagePreview, displayingImagePreview } = useContext(MessageContext)
    const createdAtDateTime = localDate.format(message.createdAt, LocalDateFormatEnum.datetime)

    function closeModal() {
        setMessage(null)
        displayImagePreview(false)
    }

    return (
        <Fragment>
            <StatusBar barStyle={"light-content"} />

            <Modal
                propagateSwipe
                style={styles.modal}
                animationIn="fadeIn"
                animationOut="fadeOut"
                swipeDirection={"right"}
                onSwipeComplete={closeModal}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                isVisible={displayingImagePreview}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={closeModal}>
                            <MaterialCommunityIcons size={42} color={"#FFF"} name="chevron-left" />
                        </TouchableOpacity>

                        <View style={styles.headerRightSide}>
                            <Text style={styles.doctorName}>
                                {message?.account.doctorName}
                            </Text>

                            <Text style={styles.timestamp}>{createdAtDateTime}</Text>
                        </View>
                    </View>

                    <ImageView uri={message?.attachment.uri!} resizeMode="contain" />
                </View>
            </Modal>
        </Fragment>
    )
}

export default memo(ImagePreview)

