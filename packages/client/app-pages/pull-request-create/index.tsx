'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PullRequestCreateForm } from '@/app-pages/pull-request-create/types';
import { pullRequestSchema } from '@/app-pages/pull-request-create/validation';
import { Button, MenuItem, Select, TextField } from '@/components/mui';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useCreatePullRequestMutation } from '@/store/quries/pull-requests';
import { useGetInfoQuery } from '@/store/quries/repositories';
import { selectAuth } from '@/store/slices/auth/selectors';

import { Branches, Main } from './style';

export const PullRequestCreatePage = ({
    params: { username, repository },
}: {
    params: { username: string; repository: string };
}) => {
    const { username: currentUsername } = useAppSelector(selectAuth);

    const { data } = useGetInfoQuery({
        username,
        repository,
        branch: '',
        currentUser: currentUsername!,
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<PullRequestCreateForm>({
        resolver: yupResolver(pullRequestSchema),
        mode: 'onTouched',
    });

    const [create, { isSuccess, data: created }] =
        useCreatePullRequestMutation();

    const router = useRouter();
    const locale = useLocale();
    useEffect(() => {
        if (isSuccess)
            router.push(
                `/${locale}/repository/${username}/${repository}/pull-request/${created.id}`,
            );
    }, [isSuccess, locale]);

    if (!data) return null;

    const { branches } = data;

    const handleSelect =
        (select: keyof PullRequestCreateForm) => (e: SelectChangeEvent) => {
            setValue(select, e.target.value);
        };

    const onSubmit = handleSubmit(({ source, destination, title, content }) => {
        create({
            source,
            destination,
            username,
            repository,
            title,
            content,
        });
    });

    return (
        <Main onSubmit={onSubmit}>
            <h1>Создание запроса на слияние</h1>
            <TextField
                {...register('title')}
                label="Заголовок"
                error={!!errors.title}
                helperText={errors.title?.message}
            ></TextField>
            <TextField
                {...register('content')}
                label="Контент"
                error={!!errors.content}
                helperText={errors.content?.message}
                multiline
                minRows={10}
                maxRows={10}
            ></TextField>
            <Branches>
                <span>Из</span>
                <Select
                    {...register('source')}
                    onChange={handleSelect('source')}
                    error={!!errors.source}
                >
                    {branches.map((branch) => (
                        <MenuItem key={branch} value={branch}>
                            {branch}
                        </MenuItem>
                    ))}
                </Select>

                <span>В</span>
                <Select
                    {...register('destination')}
                    onChange={handleSelect('destination')}
                    error={!!errors.destination}
                >
                    {branches.map((branch) => (
                        <MenuItem key={branch} value={branch}>
                            {branch}
                        </MenuItem>
                    ))}
                </Select>

                <Button type="submit">Создать запрос</Button>
            </Branches>
        </Main>
    );
};
