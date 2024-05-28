'use client';

import { authService } from '@/services/auth';
import { LoginData } from '@/store/slices/auth/types';
import { setAccessToken } from '@/utils/local-storage-utils';
import { createSliceWithThunks } from '@/utils/slice-thunk';

export interface State {
    authorized: boolean;
    username: string | null;
    roles: string[];
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    authorized: false,
    username: null,
    roles: [],
    isLoading: false,
    error: null,
};

const authSlice = createSliceWithThunks({
    name: 'auth',
    initialState,
    reducers: (create) => ({
        login: create.asyncThunk(
            async (data: LoginData, thunkAPI) => {
                const { accessToken } = await authService.login(data);
                setAccessToken(accessToken);
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state, action) => {
                    state.error = action.payload ?? action.error;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        refresh: create.asyncThunk(async () => {
            return null;
        }),
    }),
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
