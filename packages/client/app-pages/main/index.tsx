'use client';

import { useTranslations } from 'next-intl';

import { Main } from '@/app-pages/main/style';

export const MainPage = () => {
    const t = useTranslations('main');

    return (
        <Main>
            <h1>{t('title')}</h1>
        </Main>
    );
};
