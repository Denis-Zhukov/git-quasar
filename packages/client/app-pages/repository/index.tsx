'use client';

import Favorite from '@mui/icons-material/Bookmark';
import Unfavorite from '@mui/icons-material/BookmarkBorder';
import { SelectChangeEvent } from '@mui/material';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { FileObserver } from '@/components/file-observer';
import { FileTree } from '@/components/file-tree';
import {
    Breadcrumbs,
    Button,
    MenuItem,
    Select,
    Skeleton,
    TextField,
} from '@/components/mui';
import { theme } from '@/constants/theme';
import { URLS } from '@/constants/urls';
import { useAppSelector } from '@/hooks/redux-toolkit';
import {
    useFavoriteRepositoryMutation,
    useGetInfoQuery,
    useLazyGetFileQuery,
} from '@/store/quries/repositories';
import { selectAuth } from '@/store/slices/auth/selectors';

import {
    Block,
    Explorer,
    GetRepository,
    HeaderRepository,
    RepositoryNav,
} from './style';

export const RepositoryPage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const t = useTranslations('repository');
    const locale = useLocale();

    const { username: currentUsername } = useAppSelector(selectAuth);

    const [anchorGetRepo, setAnchorGetRepo] =
        React.useState<null | HTMLElement>(null);
    const getRepoIsOpen = Boolean(anchorGetRepo);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorGetRepo(event.currentTarget);
    const handleClose = () => setAnchorGetRepo(null);

    const inputLinkRepoRef = useRef<HTMLInputElement | null>(null);
    const handleSelectAllText = () => inputLinkRepoRef.current?.select();

    const [branch, setBranch] = useState('');
    const { data } = useGetInfoQuery({
        username,
        repository,
        branch,
        currentUser: currentUsername!,
    });
    const [getFile, { data: dataFile }] = useLazyGetFileQuery();
    const [favorite] = useFavoriteRepositoryMutation();

    const handleClickFile = (filepath: string) => () =>
        getFile({ username, repository, filepath, branch });
    const handleFavorite = () => favorite({ username, repository });

    const firstRef = useRef<boolean>(true);
    useEffect(() => {
        if (data && firstRef.current) {
            setBranch(data.mainBranch);
            firstRef.current = false;
        }
    }, [data]);
    const handleChangeBranch = (e: SelectChangeEvent) => {
        setBranch(e.target.value);
    };

    const crumbs = dataFile?.path.replace(/^.\//, '').split('/');

    return (
        <Block>
            <RepositoryNav>
                <Link
                    href={`/${locale}/repository/${username}/${repository}/issues`}
                >
                    {t('issues')}
                </Link>
                <Link
                    href={`/${locale}/repository/${username}/${repository}/settings`}
                >
                    {t('settings')}
                </Link>

                {username === currentUsername && data?.owner && (
                    <Button onClick={handleFavorite} size="small">
                        {data?.favorite ? <Favorite /> : <Unfavorite />}
                    </Button>
                )}
            </RepositoryNav>

            <HeaderRepository>
                <Select value={branch} onChange={handleChangeBranch}>
                    {data?.branches.map((branch) => (
                        <MenuItem key={branch} value={branch}>
                            {branch}
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    id="basic-button"
                    aria-controls={getRepoIsOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={getRepoIsOpen ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {t('get-repo')}
                </Button>
                <GetRepository
                    id="basic-menu"
                    anchorEl={anchorGetRepo}
                    open={getRepoIsOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <TextField
                        inputRef={inputLinkRepoRef}
                        onFocus={handleSelectAllText}
                        onClick={handleSelectAllText}
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
                <h3>{t('directory')}</h3>
                <Breadcrumbs>
                    {crumbs?.map((crumb, i) => (
                        <span
                            key={`${crumb}-${i}`}
                            style={{
                                color:
                                    i === crumbs.length - 1
                                        ? theme.color.primary
                                        : 'inherit',
                            }}
                        >
                            {crumb}
                        </span>
                    ))}
                </Breadcrumbs>
                <FileTree
                    onClickFile={handleClickFile}
                    files={data?.files ?? []}
                />
                <FileObserver content={dataFile?.file ?? '...'} />
            </Explorer>
        </Block>
    );
};
