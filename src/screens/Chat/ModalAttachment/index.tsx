import Modal from "react-native-modal";
import { View, StyleSheet } from "react-native";
import React, { memo, useContext, useEffect } from "react";

import { VideoButton } from "./Video";
import { CameraButton } from "./Camera";
import { GalleryButton } from "./Gallery";
import { DocumentButton } from "./Document";
import { useViewModel } from "./Video/viewModel";
import { FileAttachmentModalContext } from "../../../context/AttachModal";

interface Props {
    assetMediaUri: string | undefined
}

export default memo(({ assetMediaUri }: Props) => {
    const { handleRecordedVideo } = useViewModel();
    const { isDisplayingModal, displayModal } = useContext(FileAttachmentModalContext);

    useEffect(() => {
        if (assetMediaUri) {
            handleRecordedVideo(assetMediaUri);
        }
    }, [assetMediaUri])

    return (
        <Modal
            style={styles.modal}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={isDisplayingModal}
            onBackdropPress={() => displayModal(false)}
            onBackButtonPress={() => displayModal(false)}
        >
            <View style={styles.content}>
                <DocumentButton />
                <CameraButton />
                <VideoButton />
                <GalleryButton />
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    content: {
        height: 120,
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    }
});
