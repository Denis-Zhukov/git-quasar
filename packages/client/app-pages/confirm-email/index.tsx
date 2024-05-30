'use client';
import { useTranslations } from 'next-intl';

import { Wrapper } from './style';

export const ConfirmEmailPage = () => {
    const t = useTranslations('confirm-email');

    return (
        <Wrapper>
            <main>
                <h1>{t('title')}</h1>
                <p>{t('text')}</p>
                <p>{t('subtext')}</p>
            </main>
        </Wrapper>
    );
};
