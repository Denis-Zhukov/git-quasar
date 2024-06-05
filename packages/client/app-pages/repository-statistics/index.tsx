'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { useGetStatisticCommitsQuery } from '@/store/quries/statistics';

import { Main } from './style';

export const RepositoryStatisticsPage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const { data: commits } = useGetStatisticCommitsQuery({
        username,
        repository,
    });

    const statistics = commits
        ? Object.keys(commits.statistic).map((username) => ({
            username,
            количество: commits.statistic[username],
        }))
        : [];

    return (
        <Main>
            <h1>Коммиты пользователей</h1>
            <BarChart width={730} height={250} data={statistics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis allowDecimals={false} />
                <Legend />
                <Tooltip />
                <Bar fill="#8884d8" dataKey="количество" />
            </BarChart>
        </Main>
    );
};
