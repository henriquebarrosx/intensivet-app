import React, { useEffect } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"

import VideoCameraComponent from "../../components/VideoRecord"
import { RecordVideoProvider } from "../../context/RecordVideo"
import { useVetCaseContext } from "../../context/VetCaseContext"
import { pushNotification } from "../../infra/adapters/push-notification"

const VideoCamera = () => {
    const navigation = useNavigation()
    const vetCaseContext = useVetCaseContext()
    const isCurrentScreenFocused = useIsFocused()

    const onVideoComplete = (assetUri: string): void => {
        navigation.navigate("Chat", {
            videoUri: assetUri,
            vetCaseId: vetCaseContext.data.id,
            petName: vetCaseContext.data.pet.name,
            clinicFantasyName: vetCaseContext.data.clinic.fantasy_name,
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