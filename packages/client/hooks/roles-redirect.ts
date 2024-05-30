import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux-toolkit';
import { selectAuth } from '@/store/slices/auth/selectors';

export const useRolesRedirect = (...validRoles: string[]) => {
    const { authorized, roles, isLoading } = useAppSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (
            !authorized ||
            (validRoles.length > 0 &&
                !validRoles.some((role) => roles.includes(role)))
        ) {
            const timer = setTimeout(() => router.replace('/'), 500);
            return () => clearTimeout(timer);
        }
    }, [authorized, roles]);
};
