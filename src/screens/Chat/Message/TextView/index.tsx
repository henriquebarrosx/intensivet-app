import React from "react"
import { Container, Content } from "./styles"
import { Message } from "../../../../domain/entities/message"

type Props = {
    message: Message
}

export function TextView({ message }: Props) {
    return (
        <Container>
            <Content isSender={message.isSender}>
                {message.message}
            </Content>
        </Container>
    );
}
