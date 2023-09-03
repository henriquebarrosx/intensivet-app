import { ReactNode } from "react"

export function ScreenWrapper(props: Props) {
    const { children } = props
    return children
}

type Props = {
    children: ReactNode
}