import { LocalStorageItems } from '@/constants/local-storage-items';

export const setAccessToken = (value: string) =>
    localStorage.setItem(LocalStorageItems.accessToken, value);

export const getAccessToken = () =>
    localStorage.getItem(LocalStorageItems.accessToken);

export const removeAccessToken = () =>
    localStorage.removeItem(LocalStorageItems.accessToken);
