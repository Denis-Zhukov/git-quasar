import { notFound } from 'next/navigation';

import { LeftBlock } from '@/components/profile/left-block';
import { RightBlock } from '@/components/profile/right-block';
import { URLS } from '@/constants/urls';

import { Main } from './style';

export const ProfilePage = async ({
    params: { name },
}: {
    params: { name: string };
}) => {
    const response = await fetch(URLS.getAccountByName(name), {
        cache: 'no-store',
    });
    const {
        username,
        avatar,
        name: nameUser,
        surname,
        followers,
        following,
        bio,
        blocked,
        deactivated,
    } = await response.json();

    const repositoryResponse = await fetch(URLS.getFavoritesByName(name), {
        cache: 'no-store',
    });
    const repositories = await repositoryResponse.json();

    if (deactivated) return notFound();

    return (
        <Main>
            <LeftBlock
                username={username}
                avatar={avatar}
                name={nameUser}
                surname={surname}
                followers={followers}
                following={following}
                blocked={blocked}
            />
            <RightBlock bio={bio} username={name} favorites={repositories} />
        </Main>
    );
};
