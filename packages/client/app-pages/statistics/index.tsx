'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Main } from '@/app-pages/statistics/style';
import { months } from '@/constants/months';
import { useGetStatisticsCreateAccountQuery } from '@/store/quries/statistics';

export const StatisticsPage = () => {
    const t = useTranslations('admin-statistics');
    const { data } = useGetStatisticsCreateAccountQuery({});
    const locale = useLocale();

    const stat = useMemo(() => {
        if (!data) return [];
        return months[locale as 'ru' | 'en'].map((name, index) => ({
            name,
            [t('count')]:
                data.find(({ month }) => +month === index + 1)?.count ?? 0,
        }));
    }, [data]);

    return (
        <Main>
            <BarChart width={730} height={250} data={stat}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" allowDecimals={false} />
                <YAxis allowDecimals={false} />
                <Legend />
                <Tooltip />
                <Bar dataKey={t('count')} fill="#8884d8" />
            </BarChart>
        </Main>
    );
};
