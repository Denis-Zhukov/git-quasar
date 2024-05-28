'use client';

import { useForm } from 'react-hook-form';

import { useActions } from '@/hooks/useActionts';

// eslint-disable-next-line react/display-name
export default () => {
    const { login } = useActions();

    const { register, handleSubmit } = useForm<{
        usernameOrEmail: string;
        password: string;
    }>();

    const onSubmit = handleSubmit((data) => {
        login(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <input type="text" {...register('usernameOrEmail')} /> <br />
            <input type="password" {...register('password')} /> <br />
            <button type="submit">Войти</button>
        </form>
    );
};
