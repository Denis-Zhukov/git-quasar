'use client';

import { Content } from './style';
import type { FileObserverProps } from './types';

export const FileObserver = ({ content }: FileObserverProps) => {
    return (
        <>
            <Content>{content}</Content>
        </>
    );
};
