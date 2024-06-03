import { URLS } from '@/constants/urls';

import { api } from '../api';
import { StatisticsAccountCreateResponse } from './types';

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
    }),
});

export const { useGetStatisticsCreateAccountQuery } = statisticsApi;
