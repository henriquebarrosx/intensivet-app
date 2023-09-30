import React, { useEffect } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"

import { useVetCase } from "../../context/VetCaseContext"
import VideoCameraComponent from "../../components/VideoRecord"
import { RecordVideoProvider } from "../../context/RecordVideo"
import { pushNotification } from "../../infra/adapters/push-notification"

const VideoCamera = () => {
    const { vetCase } = useVetCase()
    const navigation = useNavigation()
    const isCurrentScreenFocused = useIsFocused()

    const onVideoComplete = (assetUri: string): void => {
        navigation.navigate("Chat", {
            videoUri: assetUri,
            vetCaseId: vetCase.id,
            petName: vetCase.pet.name,
            clinicFantasyName: vetCase.clinic.fantasy_name,
        })
    }

    useEffect(() => {
        if (isCurrentScreenFocused) {
            pushNotification.enableNotificationsLocally()
        }
    }, [isCurrentScreenFocused])

    return <VideoCameraComponent onComplete={onVideoComplete} />
}

export default () => (
    <RecordVideoProvider>
        <VideoCamera />
    </RecordVideoProvider>
)