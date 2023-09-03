import { useState } from "react";

export function useToggle(initialValue: boolean): [boolean, () => void] {
    const [isTruth, toggleFlag] = useState(initialValue)

    function onToggle() {
        toggleFlag((prevValue) => !prevValue)
    }

    return [isTruth, onToggle]
}