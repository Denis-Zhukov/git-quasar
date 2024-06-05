'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Tab, TabContext, TabList } from '@/components/mui';
import { useRolesRedirect } from '@/hooks/roles-redirect';

import { Collaborators } from './collaborators';
import { Repository } from './repository';
import { FullWidthTab, Main } from './style';

export const RepositorySettings = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    useRolesRedirect();

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('tab');

    const t = useTranslations('repository-settings');
    const [tab, setTab] = useState(initialQuery ?? 'repo');

    const handleChange = (_: unknown, newValue: string) => {
        setTab(newValue);
        router.push(`?tab=${newValue}`);
    };

    return (
        <Main>
            <TabContext value={tab}>
                <TabList orientation="vertical" onChange={handleChange}>
                    <Tab label={t('repo')} value="repo" />
                    <Tab label={t('collaborators')} value="collaborators" />
                </TabList>
                <FullWidthTab value="repo">
                    <Repository username={username} repository={repository} />
                </FullWidthTab>
                <FullWidthTab value="collaborators">
                    <Collaborators
                        username={username}
                        repository={repository}
                    />
                </FullWidthTab>
            </TabContext>
        </Main>
    );
};
