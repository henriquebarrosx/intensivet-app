import React, { memo, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../../../../utils/colors";
import { Message } from "../../../../schemas/Message";

interface RenderDocumentProps {
  message: Message;
}

export default memo(({ message }: RenderDocumentProps) => {
  const navigation = useNavigation();

  const documentColors = useMemo(() => {
    return message.is_sender ? colors.white : colors.primary;
  }, [message]);

  const openResource = async () => {
    navigation.navigate('WebPage', {
      source: message.service_url,
      screenTitle: `${message.account.doctor_name}`,
    });
  };

  const iconName = useMemo(() => {
    const foundIcon = icons.find(({ endsWith }) => {
      return endsWith === message.file_name.split('.').pop();
    });

    return foundIcon?.icon || 'file';
  }, [message?.file_name]);

  return (
    <TouchableOpacity style={styles.content} onPress={openResource}>
      <MaterialCommunityIcons size={32} color={documentColors} name={iconName} />

      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text, { color: documentColors }]}>
        {message.file_name}
      </Text>
    </TouchableOpacity>
  );
});

const icons = [
  {
    endsWith: 'pdf',
    icon: 'file-pdf-box',
  },
  {
    endsWith: 'csv',
    icon: 'file-excel',
  },
  {
    endsWith: 'xlsx',
    icon: 'file-excel',
  },
  {
    endsWith: 'docx',
    icon: 'file-word',
  },
  {
    endsWith: 'mp3',
    icon: 'music',
  }
]

const styles = StyleSheet.create({
  content: {
    paddingTop: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  text: {
    minWidth: 110,
    maxWidth: "80%",
    paddingLeft: 8,
    paddingRight: 10,
  },
});
