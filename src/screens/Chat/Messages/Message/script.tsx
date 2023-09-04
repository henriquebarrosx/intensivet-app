import { Message as MessageModel, MessageType } from "../../../../schemas/Message";

import RenderText from "./RenderText";
import RenderAudio from "./RenderAudio";
import RenderVideo from "./RenderVideo";
import RenderImage from "./RenderImage";
import RenderDocument from "./RenderDocument";

const messageType: MessageType = {
  text: RenderText,
  image: RenderImage,
  video: RenderVideo,
  audio: RenderAudio,
  file: RenderDocument,
};

export function useMessage(message: MessageModel) {
  const messageFormat = message.message_type as keyof MessageType;
  const Template =  messageType[messageFormat];
  return { Template }
}