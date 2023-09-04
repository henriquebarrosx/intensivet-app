import { Fragment } from "react";
import { WithChildren } from "../../@types/common";

interface Props extends WithChildren {
  isVisible: boolean;
}

export function Visibility({ isVisible, children }: Props) {
  return isVisible? <Fragment>{children}</Fragment> : null;
}