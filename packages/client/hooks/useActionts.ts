import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { authActions, refresh } from '@/store/slices/auth';

import { useAppDispatch } from './redux-toolkit';

const actions = {
    refresh,
    ...authActions,
};

export const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
