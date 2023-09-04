import * as VideoThumbnails from "expo-video-thumbnails";
import { Image, TouchableOpacity, View } from "react-native";
import React, { memo, useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { styles } from "./styles";
import { Message } from "../../../../../schemas/Message";
import { MessageContext } from "../../../../../context/MessageContext";

function RenderImage({ message }: { message: Message }) {
    const { setMessage, displayVideoPreview } = useContext(MessageContext);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    function previewImage(): void {
        setMessage(message);
        displayVideoPreview(true);
    };

    async function generateThumbnail(): Promise<void> {
        const { uri } = await VideoThumbnails.getThumbnailAsync(message.service_url, { quality: 0.1 });
        setVideoPreview(uri);
    };

    useEffect(() => {
        generateThumbnail();
    }, []);

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
            <Image
                style={styles.image}
                source={{ uri: videoPreview!, cache: "force-cache" }}
            />

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

export default memo(RenderImage);
