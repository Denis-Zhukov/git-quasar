'use client';

import 'react-calendar-heatmap/dist/styles.css';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import CalendarHeatmap from 'react-calendar-heatmap';

import { Favorites, RepositoryCard } from '@/app-pages/profile/style';
import { months } from '@/constants/months';

import { Block, Header } from './style';
import type { RightBlockProps } from './types';

export const RightBlock = ({ bio, username, favorites }: RightBlockProps) => {
    const t = useTranslations('profile');
    const locale = useLocale();
    const formatter = new Intl.DateTimeFormat(locale);

    return (
        <Block>
            <h2>{t('bio')}</h2>
            <p>{bio ?? t('fill-out-bio')}</p>

            <h2>{t('favorites')}</h2>
            <Favorites>
                {favorites.map(({ id, name, createdAt }) => (
                    <RepositoryCard key={id}>
                        <h3>{name}</h3>
                        <time>{formatter.format(new Date(createdAt))}</time>
                    </RepositoryCard>
                ))}
            </Favorites>

            <h2>{t('activity')}</h2>
            <CalendarHeatmap
                monthLabels={months[locale as 'ru' | 'en']}
                startDate={new Date('2024-01-01')}
                endDate={new Date('2024-12-31')}
                values={[
                    { date: '2024-01-02', count: 1 },
                    { date: '2024-05-30', count: 5 },
                    { date: '2024-06-01', count: 4 },
                    { date: '2024-06-03', count: 24 },
                ]}
            />
        </Block>
    );
};
