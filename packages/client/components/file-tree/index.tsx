'use client';

import FolderIcon from '@mui/icons-material/Folder';
import { useMemo, useState } from 'react';

import { FileItem } from '@/components/file-tree/style';
import { getFilesOnCurrentLevel } from '@/utils/get-files-on-current-level';

import { FileTreeProps } from './types';

export const FileTree = ({ files, onClickFile }: FileTreeProps) => {
    const [currentDir, setCurrentDir] = useState('.');

    const items = useMemo(() => {
        const unsortedFiles = getFilesOnCurrentLevel(files, currentDir);
        const currentFiles = unsortedFiles
            .filter(({ type }) => type === 'file')
            .sort((a, b) => a.name.localeCompare(b.name));
        const currentFolders = unsortedFiles
            .filter(({ type }) => type === 'folder')
            .sort((a, b) => a.name.localeCompare(b.name));
        return currentFolders.concat(currentFiles);
    }, [files, currentDir]);

    const handleExit = () => {
        const folders = currentDir.split('/');
        folders.pop();
        setCurrentDir(folders.join('/'));
    };

    const handleClick = (folder: string) => () => {
        const folders = currentDir.split('/');
        folders.push(folder);
        setCurrentDir(folders.join('/'));
    };

    return (
        <div style={{ color: 'white' }}>
            <ul>
                {currentDir !== '.' && <li onClick={handleExit}>..</li>}
                {items.map(({ name, type }) => (
                    <FileItem
                        onClick={
                            type === 'folder'
                                ? handleClick(name)
                                : onClickFile(`${currentDir}/${name}`)
                        }
                        key={`${currentDir}/${name}`}
                    >
                        {type === 'folder' && <FolderIcon />} {name}
                    </FileItem>
                ))}
            </ul>
        </div>
    );
};