'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SelectChangeEvent } from '@mui/material';
import { useForm } from 'react-hook-form';

import { PullRequestCreateForm } from '@/app-pages/pull-request-create/types';
import { pullRequestSchema } from '@/app-pages/pull-request-create/validation';
import { Button, MenuItem, Select } from '@/components/mui';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useCreatePullRequestMutation } from '@/store/quries/pull-requests';
import { useGetInfoQuery } from '@/store/quries/repositories';
import { selectAuth } from '@/store/slices/auth/selectors';

import { Main } from './style';

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

    const [create, { isSuccess }] = useCreatePullRequestMutation();
    if (!data) return null;

    const { branches } = data;

    const handleSelect =
        (select: keyof PullRequestCreateForm) => (e: SelectChangeEvent) => {
            setValue(select, e.target.value);
        };

    const onSubmit = handleSubmit(({ source, destination }) => {
        create({
            source,
            destination,
            username,
            repository,
        });
    });

    return (
        <Main onSubmit={onSubmit}>
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

            <Button type="submit">Объеденить</Button>
        </Main>
    );
};
