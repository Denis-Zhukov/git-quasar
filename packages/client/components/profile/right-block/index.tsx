'use client';

import 'react-calendar-heatmap/dist/styles.css';

import { useTranslations } from 'next-intl';
import CalendarHeatmap from 'react-calendar-heatmap';

import { Block } from './style';
import type { RightBlockProps } from './types';

export const RightBlock = ({ bio }: RightBlockProps) => {
    const t = useTranslations('profile');

    return (
        <Block>
            <h2>{t('bio')}</h2>
            <p>{bio ?? t('fill-out-bio')}</p>

            <h2>{t('favorites')}</h2>
            <div></div>

            <h2>{t('activity')}</h2>
            <CalendarHeatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date('2024-12-31')}
                values={[
                    { date: '2024-01-02', count: 1 },
                    { date: '2024-01-22', count: 5 },
                    { date: '2024-01-30', count: 4 },
                    { date: '2024-05-31', count: 24 },
                ]}
            />
        </Block>
    );
};
