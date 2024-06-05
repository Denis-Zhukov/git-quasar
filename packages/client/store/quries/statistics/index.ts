import { URLS } from '@/constants/urls';

import { api } from '../api';
import {
    StatisticCommitsData,
    StatisticCommitsResponse,
    StatisticsAccountCreateResponse,
} from './types';

const statisticsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getStatisticsCreateAccount: build.query<
            StatisticsAccountCreateResponse,
            unknown
        >({
            query: () => ({
                url: URLS.accountStatistics,
            }),
        }),
        getStatisticCommits: build.query<
            StatisticCommitsResponse,
            StatisticCommitsData
        >({
            query: ({ repository, username }) => ({
                url: URLS.generateGetStatisticCommits(username, repository),
            }),
        }),
    }),
});

export const {
    useGetStatisticsCreateAccountQuery,
    useGetStatisticCommitsQuery,
} = statisticsApi;
