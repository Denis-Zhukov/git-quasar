'use client';

import { SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Menu, MenuItem, Select, Tooltip } from '@/components/mui';
import { URLS } from '@/constants/urls';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useActions } from '@/hooks/useActionts';
import { useLogoutMutation } from '@/store/quries/auth';
import { selectAuth } from '@/store/slices/auth/selectors';

import {
    Avatar,
    Buttons,
    CreateRepo,
    Header as HeaderWrapper,
    Nav,
    RightBlock,
} from './style';

export const Header = () => {
    const t = useTranslations('header');
    const { authorized, username, avatar } = useAppSelector(selectAuth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const locale = useLocale();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const currentPath = usePathname();
    const router = useRouter();

    const handleChange = (e: SelectChangeEvent) => {
        if (!e.target?.value) return;
        const parts = currentPath.split('/');
        parts[1] = e.target.value;
        router.push(parts.join('/'));
    };

    const handleRedirect = (url: string) => () => {
        router.push(`/${locale}/${url}`);
        handleClose();
    };

    const [logout] = useLogoutMutation();
    const { logout: localLogout } = useActions();
    const handleLogout = () => {
        localLogout();
        logout({});
        handleClose();
    };

    return (
        <HeaderWrapper>
            <Nav>
                <Link href={`/${locale}`}>
                    <Image
                        src="/images/logo.png"
                        width={48}
                        height={48}
                        alt="GitQuasar"
                    />
                </Link>
                <Link href={`/${locale}`}>{t('home')}</Link>
                <Link href={`/${locale}/repositories`}>{t('repos')}</Link>
                <Link href={`/${locale}/about-us`}>{t('about-us')}</Link>
                <Link href={`/${locale}/pricing`}>{t('pricing')}</Link>
            </Nav>

            <RightBlock>
                {authorized && (
                    <Tooltip title={t('create-repo')}>
                        <CreateRepo href={`/${locale}/create-repo`}>
                            +
                        </CreateRepo>
                    </Tooltip>
                )}
                <Select
                    value={locale}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                >
                    <MenuItem value="ru">{t('russian')}</MenuItem>
                    <MenuItem value="en">{t('english')}</MenuItem>
                </Select>

                {authorized ? (
                    <>
                        <Avatar
                            onClick={handleClick}
                            src={URLS.getAvatarUrl(avatar!)}
                            width={32}
                            height={32}
                            alt="avatar"
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem
                                onClick={handleRedirect(`profile/${username}`)}
                            >
                                {t('profile')}
                            </MenuItem>
                            <MenuItem
                                onClick={handleRedirect(
                                    `profile/${username}/repositories`,
                                )}
                            >
                                {t('my-repos')}
                            </MenuItem>
                            <MenuItem
                                onClick={handleRedirect(
                                    `profile/${username}/settings`,
                                )}
                            >
                                {t('settings')}
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                {t('logout')}
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Buttons>
                        <Link href={`/${locale}/login`}>{t('sign-in')}</Link>
                        <Link href={`/${locale}/register`}>{t('sign-up')}</Link>
                    </Buttons>
                )}
            </RightBlock>
        </HeaderWrapper>
    );
};
