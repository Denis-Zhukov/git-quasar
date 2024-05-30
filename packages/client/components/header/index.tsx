'use client';

import { useAppSelector } from '@/hooks/redux-toolkit';
import { selectAuth } from '@/store/slices/auth/selectors';

export const Header = () => {
    const { authorized, username, roles } = useAppSelector(selectAuth);

    return <header style={{ background: 'white' }}>Header {username}</header>;
};
