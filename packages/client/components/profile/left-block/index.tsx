'use client';
import GroupIcon from '@mui/icons-material/Group';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/mui';
import {
    Block,
    FollowBlock,
    MainInfo,
    NameSurname,
} from '@/components/profile/left-block/style';
import { URLS } from '@/constants/urls';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { selectAuth } from '@/store/slices/auth/selectors';

import type { LeftBlockProps } from './types';

export const LeftBlock = ({
    name,
    username,
    surname,
    avatar,
    following,
    followers,
}: LeftBlockProps) => {
    const t = useTranslations('profile');
    const { username: currentUsername } = useAppSelector(selectAuth);

    return (
        <Block>
            <MainInfo>
                <Image
                    src={URLS.getAvatarUrl(avatar)}
                    width={200}
                    height={200}
                    alt={username}
                />
                <h2>{username}</h2>
                <NameSurname>
                    {surname && <p>{surname}</p>}
                    {name && <p>{name}</p>}
                </NameSurname>
                {username === currentUsername && (
                    <Button variant="outlined" size="small">
                        {t('edit')}
                    </Button>
                )}
            </MainInfo>
            <FollowBlock>
                <GroupIcon />
                <div>
                    {t('followers')} {followers}
                </div>
                <div>
                    {t('following')} {following}
                </div>
            </FollowBlock>
        </Block>
    );
};
