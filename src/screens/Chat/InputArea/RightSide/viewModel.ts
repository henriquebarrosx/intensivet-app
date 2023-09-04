import { Animated, Keyboard } from "react-native";
import { useContext, useRef } from "react";
import { widthPercentageToDP } from "../../../../utils/responsivity";
import { FileAttachmentModalContext } from "../../../../context/AttachModal";

export const useViewModel = () => {
    const { displayModal } = useContext(FileAttachmentModalContext);

    const paperClipOpacity = useRef(new Animated.Value(1)).current;
    const widthAnimation = useRef(new Animated.Value(widthPercentageToDP('25%'))).current;

    function openAttachmentModal(): void {
        Keyboard.dismiss();
        displayModal(true);
    }

    const increaseIn = () => {
        Animated.timing(widthAnimation, {
            duration: 200,
            useNativeDriver: false,
            toValue: widthPercentageToDP('25%'),
        }).start();

        fadeOutAnimation(paperClipOpacity);
    };

    const increaseOut = () => {
        Animated.timing(widthAnimation, {
            duration: 200,
            useNativeDriver: false,
            toValue: widthPercentageToDP('13%'),
        }).start();

        fadeInAnimation(paperClipOpacity, 300);
    };

    return { widthAnimation, increaseIn, increaseOut, paperClipOpacity, openAttachmentModal }
}

const fadeInAnimation = (fadeRef: Animated.Value, delay: number = 0): void => {
    Animated.timing(fadeRef, {
        toValue: 0,
        delay: delay,
        duration: 200,
        useNativeDriver: false,
    }).start();
}

const fadeOutAnimation = (fadeRef: Animated.Value, delay: number = 0): void => {
    Animated.timing(fadeRef, {
        toValue: 1,
        delay: delay,
        duration: 200,
        useNativeDriver: false,
    }).start();
}