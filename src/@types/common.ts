import { ReactNode } from 'react';

export type KeyboardBehavior = "padding" | "position" | "height" | undefined;

export type WithChildren<T = {}> = T & {
  children?: ReactNode
};
