import { Text } from 'react-native';
import styled from "styled-components/native";
import { BarIndicator } from "react-native-indicators";
import { UIActivityIndicator } from 'react-native-indicators';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface SenderProps {
  isSender: boolean;
}

export const Container = styled.View<SenderProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${({ isSender }) => isSender ? 8 : 6}px;
  padding-left: ${({ isSender }) => isSender ? 8 : 0}px;
`;

export const TapArea = styled.TouchableOpacity<SenderProps>`  
  width: 42px;
  height: 32px;
  z-index: 10;
  padding: 0 6px;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
`;

interface SoundStateIconProps extends SenderProps {
  isVisible: boolean;
}

export const SoundStateIcon = styled(MaterialCommunityIcons).attrs({
  size: 28,
})<SoundStateIconProps>`
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  color: ${({ theme, isSender }) => isSender ? theme.COLORS.white : theme.COLORS.gray};
`;

interface LoadingFeedbackProps extends SenderProps {
  isVisible: boolean;
}

export const LoadingFeedback = styled(UIActivityIndicator).attrs({
  size: 28,
})<LoadingFeedbackProps>`
  position: absolute;
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  color: ${({ theme, isSender }) => isSender ? theme.COLORS.chatUnlessAdminMessage : theme.COLORS.white};
`;