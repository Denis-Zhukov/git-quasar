'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Main } from '@/app-pages/pull-requests/style';

export const PullRequestsPage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const locale = useLocale();

    return (
        <Main>
            <h1>Запросы на слияния</h1>
            <Link
                href={`/${locale}/repository/${username}/${repository}/pull-requests/create`}
            >
                Создать
            </Link>
        </Main>
    );
};
