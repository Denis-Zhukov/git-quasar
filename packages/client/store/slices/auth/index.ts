import { authService } from '@/services/auth';
import { LoginData } from '@/store/slices/auth/types';
import { setAccessToken } from '@/utils/local-storage-utils';
import { createSliceWithThunks } from '@/utils/slice-thunk';

export interface State {
    authorized: boolean;
    id: string | null;
    username: string | null;
    roles: string[];
    avatar: string | null;
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    authorized: false,
    id: null,
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
                    return thunkAPI.rejectWithValue(e?.response.data);
                }
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state, action) => {
                    state.error = action.payload ?? action.error;
                    console.log(state.error);
                    state.username = null;
                    state.authorized = false;
                    state.avatar = null;
                    state.id = null;
                },
                fulfilled: (
                    state,
                    {
                        payload: {
                            user: { roles, username, avatar, id },
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
                    state.id = id;
                },
                settled: (state) => {
                    state.isLoading = false;
                },
            },
        ),
        refresh: create.asyncThunk(
            async (_) => {
                return await authService.refresh();
            },
            {
                settled: (state) => {
                    state.isLoading = false;
                },
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state) => {
                    state.username = null;
                    state.authorized = false;
                    state.avatar = null;
                    state.id = null;
                },
                fulfilled: (
                    state,
                    {
                        payload: {
                            user: { roles, username, avatar, id },
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
                    state.id = id;
                },
            },
        ),
        logout: create.reducer((state) => {
            state.authorized = false;
            state.username = null;
            state.roles = [];
            state.avatar = null;
        }),
        setUsername: create.reducer(
            (state, { payload }: { payload: string }) => {
                state.username = payload;
            },
        ),
    }),
});

export const { refresh, ...authActions } = authSlice.actions;
export default authSlice.reducer;
