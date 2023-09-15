import React, { memo, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { styles } from "./styles";
import { Message } from "../../../../domain/entities/message";
import { MessageContext } from "../../../../context/MessageContext";

function RenderVideoThumbnail({ message }: { message: Message }) {
    const { setMessage, displayVideoPreview } = useContext(MessageContext);

    function previewImage(): void {
        setMessage(message);
        displayVideoPreview(true);
    };

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
            <View style={styles.playButtonContainer}>
                <MaterialCommunityIcons
                    size={30}
                    name="play"
                    color={"#FFFFFF"}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
}

export default memo(RenderVideoThumbnail);
