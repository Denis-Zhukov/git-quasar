'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { CreateRepoForm } from '@/app/[locale]/(with-header)/create-repo/types';
import { generateCreateRepoSchema } from '@/app-pages/create-repo/validation';
import { Button, CircularProgress, Switch, TextField } from '@/components/mui';
import { useRolesRedirect } from '@/hooks/roles-redirect';
import { useCreateMutation } from '@/store/quries/repositories';

import { Main } from './style';

export const CreateRepoPage = () => {
    useRolesRedirect();
    const t = useTranslations('create-repo');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateRepoForm>({
        defaultValues: {
            privateRepo: false,
        },
        resolver: yupResolver(generateCreateRepoSchema(t)),
        mode: 'onTouched',
    });

    const [create, { isLoading }] = useCreateMutation();

    const onSubmit = handleSubmit((data) => {
        create(data);
    });

    return (
        <Main>
            <form onSubmit={onSubmit}>
                <h1>{t('title')}</h1>
                <TextField
                    {...register('repoName')}
                    label={t('name.label')}
                    helperText={errors.repoName?.message}
                    error={!!errors.repoName}
                />
                <label>
                    {t('private')} <Switch {...register('privateRepo')} />
                </label>
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : t('create')}
                </Button>
            </form>
        </Main>
    );
};
