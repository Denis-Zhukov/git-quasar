'use client';
import GroupIcon from '@mui/icons-material/Group';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/mui';
import {
    Block,
    FollowBlock,
    MainInfo,
    NameSurname,
} from '@/components/profile/left-block/style';
import { URLS } from '@/constants/urls';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useToggleBlockMutation } from '@/store/quries/account';
import { selectAuth } from '@/store/slices/auth/selectors';

import type { LeftBlockProps } from './types';

export const LeftBlock = ({
    name,
    username,
    surname,
    avatar,
    following,
    followers,
    blocked,
}: LeftBlockProps) => {
    const t = useTranslations('profile');
    const { username: currentUsername, roles } = useAppSelector(selectAuth);
    const locale = useLocale();

    const router = useRouter();
    const handleEdit = () => {
        router.push(`/${locale}/profile/${currentUsername}/settings`);
    };

    const [block] = useToggleBlockMutation();

    const handleBlock = async () => {
        await block({ username, status: !blocked });
        router.refresh();
    };

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
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleEdit}
                    >
                        {t('edit')}
                    </Button>
                )}
                {['admin', 'moderator'].some((role) =>
                    roles.includes(role),
                ) && (
                    <Button
                        onClick={handleBlock}
                        variant="outlined"
                        size="small"
                        color="error"
                    >
                        {blocked ? t('unblock') : t('block')}
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
