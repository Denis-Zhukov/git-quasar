import type { Action, PayloadAction } from '@reduxjs/toolkit';
import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '@/store';
import { getAccessToken } from '@/utils/local-storage-utils';

const customBaseQuery: BaseQueryFn = async (
    args,
    api: BaseQueryApi,
    extraOptions,
) => {
    const query = fetchBaseQuery({
        baseUrl: '',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getAccessToken()}`);
            return headers;
        },
    });

    let result = await query(args, api, extraOptions);

    if (result.error?.status === 401) {
        // await api.dispatch(refreshAuthThunk);
        result = await query(args, api, extraOptions);
    }

    return result;
};

const isHydrateAction = (
    action: Action,
): action is PayloadAction<RootState> => {
    return action.type === HYDRATE;
};

export const api = createApi({
    tagTypes: [],
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({}),
});
