import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux-toolkit';
import { selectAuth } from '@/store/slices/auth/selectors';

export const useAuthRedirect = () => {
    const { authorized } = useAppSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (authorized) router.replace('/');
    }, [authorized]);
};
