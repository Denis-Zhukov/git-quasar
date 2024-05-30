import { authService } from '@/services/auth';
import { LoginData } from '@/store/slices/auth/types';
import { setAccessToken } from '@/utils/local-storage-utils';
import { createSliceWithThunks } from '@/utils/slice-thunk';

export interface State {
    authorized: boolean;
    username: string | null;
    roles: string[];
    avatar: string | null;
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    authorized: false,
    username: null,
    roles: [],
    avatar: null,
    isLoading: false,
    error: null,
};

const authSlice = createSliceWithThunks({
    name: 'auth',
    initialState,
    reducers: (create) => ({
        login: create.asyncThunk(
            async (data: LoginData, thunkAPI) => {
                try {
                    return await authService.login(data);
                } catch (e: any) {
                    if ('message' in e) {
                        return thunkAPI.rejectWithValue(e?.message);
                    }
                    return thunkAPI.rejectWithValue('Unknown error');
                }
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state, action) => {
                    state.error = action.payload ?? action.error;
                    state.username = null;
                    state.authorized = false;
                    state.avatar = null;
                },
                fulfilled: (
                    state,
                    {
                        payload: {
                            user: { roles, username, avatar },
                            accessToken,
                        },
                    },
                ) => {
                    state.authorized = true;
                    state.error = null;
                    setAccessToken(accessToken);
                    state.username = username;
                    state.roles = roles;
                    state.avatar = avatar;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        refresh: create.asyncThunk(
            async (_) => {
                const user = await authService.refresh();
                return user;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state) => {
                    state.username = null;
                    state.authorized = false;
                    state.avatar = null;
                },
                fulfilled: (
                    state,
                    {
                        payload: {
                            user: { roles, username, avatar },
                            accessToken,
                        },
                    },
                ) => {
                    state.authorized = true;
                    state.error = null;
                    setAccessToken(accessToken);
                    state.username = username;
                    state.roles = roles;
                    state.avatar = avatar;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        logout: create.reducer((state) => {
            state.authorized = false;
            state.username = null;
            state.roles = [];
            state.avatar = null;
        }),
    }),
});

export const { refresh, ...authActions } = authSlice.actions;
export default authSlice.reducer;
