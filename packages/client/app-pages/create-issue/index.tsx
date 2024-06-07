'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CreateIssueForm } from '@/app-pages/create-issue/types';
import { createIssueSchema } from '@/app-pages/create-issue/validation';
import { Button, TextField } from '@/components/mui';
import { useRolesRedirect } from '@/hooks/roles-redirect';
import { useCreateIssueMutation } from '@/store/quries/issues';

import { Main, Wrapper } from './style';

export const CreateIssue = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    useRolesRedirect();
    const t = useTranslations('create-issue');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateIssueForm>({
        resolver: yupResolver(createIssueSchema),
        mode: 'onTouched',
    });

    const router = useRouter();
    const locale = useLocale();
    const [create, { isSuccess, data }] = useCreateIssueMutation();

    useEffect(() => {
        if (isSuccess)
            router.push(
                `/${locale}/repository/${username}/${repository}/issue/${data.id}`,
            );
    }, [isSuccess]);

    const onSubmit = handleSubmit((data) => {
        create({ ...data, usernameOwner: username, repository });
    });

    return (
        <Wrapper>
            <Main onSubmit={onSubmit}>
                <TextField
                    {...register('title')}
                    label={t('title')}
                    helperText={errors.title?.message}
                    error={!!errors.title}
                />
                <TextField
                    {...register('question')}
                    label={t('question')}
                    multiline
                    minRows={10}
                    maxRows={10}
                    helperText={errors.title?.message}
                    error={!!errors.title}
                />
                <Button type="submit">{t('create')}</Button>
            </Main>
        </Wrapper>
    );
};
