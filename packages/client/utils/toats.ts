import { toast } from 'react-toastify';

export const toastError = (text: string) =>
    toast(text, {
        theme: 'dark',
        type: 'error',
    });

export const toastSuccess = (text: string) =>
    toast(text, {
        theme: 'dark',
        type: 'success',
    });

export const toastInfo = (text: string) =>
    toast(text, {
        theme: 'dark',
        type: 'info',
    });
