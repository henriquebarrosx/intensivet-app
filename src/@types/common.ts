import { ReactNode } from 'react';

export type KeyboardBehavior = "padding" | "position" | "height" | undefined;

export type WithChildren<T = {}> = T & {
    children?: ReactNode
};

export type Pagination = {
    next: number | null;
    limit: number | null;
    current: number | null;
    previous: number | null;
    total_pages: number | null;
    total_count: number | null;
}
