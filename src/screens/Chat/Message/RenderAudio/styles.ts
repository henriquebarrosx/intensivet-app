import styled from "styled-components/native"
import { ActivityIndicator, Dimensions, Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface SenderProps {
    isSender: boolean;
}

export const Container = styled.View<SenderProps>`
    height: 32px;
    max-width: 180px;
    width: ${Dimensions.get("screen").width / 1.5}px;
    display: flex;
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 8px;
    margin-top: ${({ isSender }) => isSender ? 12 : 8}px;
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

export const SoundStateIcon = styled(MaterialCommunityIcons).attrs({ size: 28 }) <SoundStateIconProps>`
    display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
    color: ${({ isSender }) => isSender ? "#FFFFFF" : "#20b9cd"};
`;

export const Dashes = styled(Text) <SenderProps>`
    color: ${({ isSender }) => isSender ? "#FFFFFF" : "#20b9cd"};
`;

interface LoadingFeedbackProps extends SenderProps {
    isVisible: boolean;
}

export const LoadingFeedback = styled(ActivityIndicator).attrs({ size: 28 }) <LoadingFeedbackProps>`
    position: absolute;
    display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
    color: ${({ isSender }) => isSender ? "#20b9cd" : "#FFFFFF"};
`;