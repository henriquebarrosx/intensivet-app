import { Text, View, StyleSheet } from "react-native";
import React, { memo, useMemo, useCallback } from "react";
import { MessageType, VetCase } from "../../../../schemas/VetCase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  vetCase: VetCase;
}

const LastMessageComponent = ({vetCase}: Props) => {
  const isTextMessageType = useMemo(() => isTextMessage(vetCase), [vetCase]);

  const lastMessage = useMemo(() => {
    const attachmentMessage = [
      { type: isImageMessage(vetCase), text: 'Nova imagem', icon: 'camera' },
      { type: isVideoMessage(vetCase), text: 'Novo vídeo', icon: 'video' },
      { type: isFileMessage(vetCase), text: 'Novo anexo', icon: 'file-document' },
      { type: isAudioMessage(vetCase), text: 'Novo áudio', icon: 'microphone' },
      { type: isTextMessage(vetCase), text: getTextMessage(vetCase), icon: 'pen' },
    ];

    return attachmentMessage.find((message) => !!message.type);
  }, [vetCase?.last_message?.message_type]);

  const Template = useCallback(() => {
    if (isTextMessageType) {
      return (
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.lastMessage}>
          {lastMessage?.text}
        </Text>
      )
    }

    return (
      <View style={styles.lastMessageToUnlessText}>
        <MaterialCommunityIcons size={16} name={lastMessage?.icon!} color={"#757575"} />

        <Text style={styles.descriptionToMessageUnlessText}>
          {lastMessage?.text}
        </Text>
      </View>
    );
  }, [lastMessage, isTextMessageType]);

  return <Template />;
}

const isImageMessage = (vetCase: VetCase) => {
  return vetCase?.last_message?.message_type === MessageType.IMAGE;
}

const isVideoMessage = (vetCase: VetCase) => {
  return vetCase?.last_message?.message_type === MessageType.VIDEO;
}

const isFileMessage = (vetCase: VetCase) => {
  return vetCase?.last_message?.message_type === MessageType.FILE;
}

const isAudioMessage = (vetCase: VetCase) => {
  return vetCase?.last_message?.message_type === MessageType.AUDIO;
}

const isTextMessage = (vetCase: VetCase): boolean => {
  const isText = vetCase?.last_message?.message_type === MessageType.TEXT;
  return !vetCase?.last_message || !!isText;
}

const getTextMessage = (vetCase: VetCase): string => {
  return vetCase?.last_message?.message || `${vetCase.vet.doctor_name} iniciou um novo caso`;
}

const styles = StyleSheet.create({
  lastMessage: {
    marginTop: 6,
    color: '#757575',
  },
  lastMessageToUnlessText: {
    marginTop: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionToMessageUnlessText: {
    marginLeft: 6,
    color: '#757575',
  },
});

export const LastMessage = memo(LastMessageComponent);