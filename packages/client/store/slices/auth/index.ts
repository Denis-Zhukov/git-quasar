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
                try {
                    const responseData = await authService.login(data);
                    return responseData;
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
                },
                fulfilled: (
                    state,
                    {
                        payload: {
                            user: { roles, username },
                            accessToken,
                        },
                    },
                ) => {
                    state.authorized = true;
                    state.error = null;
                    setAccessToken(accessToken);
                    state.username = username;
                    state.roles = roles;
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
