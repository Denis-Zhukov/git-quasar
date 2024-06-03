'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useGetIssuesQuery } from '@/store/quries/issues';

import { CreateIssue, IssueCard, IssuesBlock, Main } from './style';

export const Issues = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const locale = useLocale();
    const t = useTranslations('issues');
    const { data } = useGetIssuesQuery({ username, repository });

    const router = useRouter();
    const handleClickIssue = (id: string) => () => {
        router.push(
            `/${locale}/repository/${username}/${repository}/issue/${id}`,
        );
    };

    return (
        <Main>
            <CreateIssue
                href={`/${locale}/repository/${username}/${repository}/create-issue`}
            >
                {t('create')}
            </CreateIssue>

            <IssuesBlock>
                {data?.map(({ id, title, qustion }) => (
                    <IssueCard key={id} onClick={handleClickIssue(id)}>
                        <h3>{title}</h3>
                        <p>{qustion}</p>
                    </IssueCard>
                ))}
            </IssuesBlock>
        </Main>
    );
};
