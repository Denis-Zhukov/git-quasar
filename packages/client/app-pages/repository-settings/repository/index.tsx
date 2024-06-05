'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@/components/mui';
import { useDeleteMutation } from '@/store/quries/repositories';

import { Tab } from './style';
import { RepositoryProps } from './types';

export const Repository = ({ repository, username }: RepositoryProps) => {
    const [open, setOpen] = useState(false);
    const handleClick = (isOpen: boolean) => () => setOpen(isOpen);

    const locale = useLocale();
    const router = useRouter();
    const [remove] = useDeleteMutation();
    const handleRemove = async () => {
        const data = await remove({ username, repository });
        if (!data.error)
            router.replace(`/${locale}/profile/${username}/repositories`);
    };

    return (
        <Tab>
            <Button color="error" onClick={handleClick(true)}>
                Delete
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClick(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Вы уверены?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        После удаления репозитория его невозможно будет
                        восстановить
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick(false)}>Отмена</Button>
                    <Button onClick={handleRemove}>Удалить</Button>
                </DialogActions>
            </Dialog>
        </Tab>
    );
};
