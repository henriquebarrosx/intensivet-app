import React, { memo } from "react";
import { Container, Content } from "./styles";
import { Message } from "../../../../../schemas/Message";

interface Props {
  message: Message;
}

function RenderText({ message }: Props) {
  return (
    <Container>
      <Content isSender={message.is_sender}>
        {message.message}
      </Content>
    </Container>
  );
}

export default memo(RenderText)