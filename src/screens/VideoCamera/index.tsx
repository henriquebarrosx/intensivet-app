import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { Notification } from '../../models/Notification';
import { useVetCase } from "../../context/VetCaseContext";
import VideoCameraComponent from '../../components/VideoRecord';
import { RecordVideoProvider } from "../../context/RecordVideo";

const VideoCamera = () => {
    const { vetCase } = useVetCase();
    const navigation = useNavigation();
    const isCurrentScreenFocused = useIsFocused();

    const onVideoComplete = (assetUri: string): void => {
        navigation.navigate('Chat', {
            videoUri: assetUri,
            vetCaseId: vetCase.id,
            petName: vetCase.pet.name,
            clinicFantasyName: vetCase.clinic.fantasy_name,
        })
    }

    useEffect(() => {
        if (isCurrentScreenFocused) {
            const notification = new Notification();
            Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() });
        }
    }, [isCurrentScreenFocused]);

    return <VideoCameraComponent onComplete={onVideoComplete} />;
};

export default () => (
    <RecordVideoProvider>
        <VideoCamera />
    </RecordVideoProvider>
)