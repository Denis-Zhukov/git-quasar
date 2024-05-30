'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useError = (text: string, error: unknown[]) => {
    useEffect(() => {
        if (error) toast(text, { type: 'error', theme: 'dark' });
    }, [error]);
};
