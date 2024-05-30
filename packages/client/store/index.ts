import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from '@/store/quries/api';

import authReducer from './slices/auth';

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });

    setupListeners(store.dispatch);

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
