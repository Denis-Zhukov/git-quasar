'use client';

import { Button } from '@/components/mui';
import { useActions } from '@/hooks/useActionts';
import { useToggleDeactivateMutation } from '@/store/quries/account';

import { AccountProps } from './types';

export const Account = ({ username }: AccountProps) => {
    const { logout } = useActions();
    const [deactivate] = useToggleDeactivateMutation();
    const handleDelete = async () => {
        await deactivate({ username, status: true });
        logout();
    };

    return (
        <div>
            <Button onClick={handleDelete} color="error">
                Delete
            </Button>
        </div>
    );
};
