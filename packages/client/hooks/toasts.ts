'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useError = (text: string | boolean, error: unknown) => {
    useEffect(() => {
        if (error) toast(text, { type: 'error', theme: 'dark' });
    }, [error]);
};

export const useSuccess = (text: string, isSuccess: boolean) => {
    useEffect(() => {
        if (isSuccess) toast(text, { type: 'success', theme: 'dark' });
    }, [isSuccess]);
};
