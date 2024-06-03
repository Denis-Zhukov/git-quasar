'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Profile } from '@/app-pages/profile-settings/profile';
import { Tab, TabContext, TabList, TabPanel } from '@/components/mui';

import { Main } from './style';

export const ProfileSettingsPage = ({
    params: { name },
}: {
    params: { name: string };
}) => {
    const t = useTranslations('profile-settings');
    const [tab, setTab] = useState('profile');

    const handleChange = (_: unknown, newValue: string) => {
        setTab(newValue);
    };

    return (
        <Main>
            <TabContext value={tab}>
                <TabList orientation="vertical" onChange={handleChange}>
                    <Tab label={t('profile')} value="profile"></Tab>
                    <Tab label={t('notifications')} value="notifications"></Tab>
                    <Tab label={t('account')} value="account"></Tab>
                </TabList>
                <TabPanel value="profile">
                    <Profile username={name} />
                </TabPanel>
                <TabPanel value="notifications">2</TabPanel>
                <TabPanel value="account">3</TabPanel>
            </TabContext>
        </Main>
    );
};
