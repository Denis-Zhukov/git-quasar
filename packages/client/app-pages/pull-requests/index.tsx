'use client';

import LeftArrow from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Card, Main } from '@/app-pages/pull-requests/style';
import { useGetPullRequestsQuery } from '@/store/quries/pull-requests';

export const PullRequestsPage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const locale = useLocale();

    const { data: prs } = useGetPullRequestsQuery({ username, repository });

    return (
        <Main>
            <h1>Запросы на слияния</h1>
            <Link
                href={`/${locale}/repository/${username}/${repository}/pull-requests/create`}
            >
                Создать
            </Link>

            <div>
                {prs?.map(({ id, destination, source, title, merged }) => (
                    <Card
                        key={id}
                        href={`/${locale}/repository/${username}/${repository}/pull-request/${id}`}
                    >
                        <div>
                            {destination}
                            <LeftArrow />
                            {source}
                        </div>
                        <div>{title}</div>
                        <div>{merged ? 'Объеденено' : 'На рассмотрении'}</div>
                    </Card>
                ))}
            </div>
        </Main>
    );
};
