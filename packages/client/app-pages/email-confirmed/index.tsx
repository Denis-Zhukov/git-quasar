'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Wrapper } from '@/app-pages/email-confirmed/style';

export const EmailConfirmedPage = () => {
    const t = useTranslations('email-confirmed');

    const locale = useLocale();
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace(`/${locale}/login`);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Wrapper>
            <main>
                <h1>{t('title')}</h1>
                <p>{t('text')}</p>
            </main>
        </Wrapper>
    );
};
