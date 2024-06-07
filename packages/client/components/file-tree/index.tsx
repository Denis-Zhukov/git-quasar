'use client';

import FolderIcon from '@mui/icons-material/Folder';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';

import { getFilesOnCurrentLevel } from '@/utils/get-files-on-current-level';

import { FileItem, Wrapper } from './style';
import { FileTreeProps } from './types';

export const FileTree = ({ files, onClickFile }: FileTreeProps) => {
    const t = useTranslations('repository');
    const [currentDir, setCurrentDir] = useState('.');

    useEffect(() => {
        setCurrentDir('.');
    }, [files]);

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
        <Wrapper>
            <h3>{t('directory')}</h3>
            <ul>
                {currentDir !== '.' && (
                    <FileItem onClick={handleExit}>..</FileItem>
                )}
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
        </Wrapper>
    );
};
