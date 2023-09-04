import React, { memo } from "react";
import Widget, { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Message } from "../../../../../schemas/Message";
import ImageView from "../../../../../components/ImageView";

interface Props {
  message: Message;
}

function RenderImage({ message }: Props) {
  const navigation = useNavigation();

  function previewImage(): void {
    navigation.navigate('WebPage', {
      screenTitle: message.account.doctor_name,
      source: message.service_url,
    })
  };

  return (
    <Widget.TouchableOpacity style={styles.root} onPress={previewImage}>
      <View style={styles.image}>
        <ImageView uri={message.service_url} resizeMode="cover" />
      </View>
    </Widget.TouchableOpacity>
  );
}

export default memo(RenderImage);

const styles = Widget.StyleSheet.create({
  root: {
    maxHeight: 250,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  image: {
    height: 220,
    minWidth: 250,
    borderWidth: 0,
    borderRadius: 6,
    maxWidth: "100%",
    borderColor: "transparent",
  },
  progress: {
    marginTop: 20,
    alignSelf: "center",
    position: "absolute",
  },
});
