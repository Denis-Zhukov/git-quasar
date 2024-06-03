'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import { FileObserver } from '@/components/file-observer';
import { FileTree } from '@/components/file-tree';
import {
    Button,
    MenuItem,
    Select,
    Skeleton,
    TextField,
} from '@/components/mui';
import { URLS } from '@/constants/urls';
import {
    useGetInfoQuery,
    useLazyGetFileQuery,
} from '@/store/quries/repositories';

import { Block, Explorer, GetRepository, HeaderRepository } from './style';

export const RepositoryPage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const locale = useLocale();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const t = useTranslations('repository');

    const inputLinkRepoRef = useRef<HTMLInputElement | null>(null);
    const handleSelect = () => {
        inputLinkRepoRef.current?.select();
    };

    const { data, isLoading } = useGetInfoQuery({ username, repository });
    const [getFile, { data: file }] = useLazyGetFileQuery();
    const handleClickFile = (filepath: string) => () => {
        getFile({ username, repository, filepath });
    };

    return (
        <Block>
            <HeaderRepository>
                {data && (
                    <Select value={data.mainBranch}>
                        {data.branches.map((branch) => (
                            <MenuItem key={branch} value={branch}>
                                {branch}
                            </MenuItem>
                        ))}
                    </Select>
                )}

                <Link
                    href={`/${locale}/repository/${username}/${repository}/issues`}
                >
                    Issues
                </Link>

                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {t('get-repo')}
                </Button>
                <GetRepository
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <TextField
                        inputRef={inputLinkRepoRef}
                        onFocus={handleSelect}
                        onClick={handleSelect}
                        value={URLS.getRepoUrl(username, repository)}
                    />
                    <a
                        href={URLS.getDownloadRepoUrl(username, repository)}
                        rel="noreferrer noopener"
                        target="_blank"
                        download
                    >
                        {t('download')}
                    </a>
                </GetRepository>
            </HeaderRepository>

            <Explorer>
                {isLoading ? (
                    <Skeleton variant="rectangular" width={500} height={400} />
                ) : (
                    <FileTree
                        onClickFile={handleClickFile}
                        files={data?.files ?? []}
                    />
                )}
                <FileObserver content={file?.file ?? '...'} />
            </Explorer>
        </Block>
    );
};
