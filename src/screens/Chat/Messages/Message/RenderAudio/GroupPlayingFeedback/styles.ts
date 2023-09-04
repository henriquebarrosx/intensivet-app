import styled from "styled-components/native";
import { BarIndicator } from "react-native-indicators";

export const Container = styled.View`
  width: 100px;
  margin-left: 4px;
  align-items: center;
  flex-direction: row;
`;

interface PlayingIndicator {
  position?: number;
  isSender?: boolean;
}

export const PlayingIndicator = styled(BarIndicator).attrs({
  size: 16,
  hidesWhenStopped: false,
})<PlayingIndicator>`
  position: absolute;
`;