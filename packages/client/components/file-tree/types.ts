import { HTMLAttributes } from 'react';

export interface FileTreeProps extends HTMLAttributes<HTMLDivElement> {
    files: string[];
    onClickFile: (path: string) => () => void;
}
