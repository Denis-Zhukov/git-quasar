'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Collaborators } from '@/app-pages/repository-settings/collaborators';
import { Tab, TabContext, TabList } from '@/components/mui';
import { useRolesRedirect } from '@/hooks/roles-redirect';

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
                    <Tab label={t('repo')} value="repo"></Tab>
                    <Tab label={t('collaborators')} value="collaborators"></Tab>
                </TabList>
                <FullWidthTab value="repo">1</FullWidthTab>
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
