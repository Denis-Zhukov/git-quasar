'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { CreateIssueForm } from '@/app-pages/create-issue/types';
import { Button, TextField } from '@/components/mui';
import { useCreateIssueMutation } from '@/store/quries/issues';

import { Main } from './style';

export const CreateIssue = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const t = useTranslations('create-issue');
    const { register, handleSubmit } = useForm<CreateIssueForm>();

    const [create] = useCreateIssueMutation();

    const onSubmit = handleSubmit((data) => {
        create({ ...data, usernameOwner: username, repository });
    });

    return (
        <Main onSubmit={onSubmit}>
            <TextField {...register('title')} label={t('title')} />
            <TextField
                {...register('question')}
                label={t('question')}
                multiline
                minRows={10}
                maxRows={10}
            />
            <Button type="submit">{t('create')}</Button>
        </Main>
    );
};
