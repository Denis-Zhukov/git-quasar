import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { authActions } from '@/store/slices/auth';

import { useAppDispatch } from './redux-toolkit';
const actions = {
    ...authActions,
};

export const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
