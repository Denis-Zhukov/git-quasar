'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, Button, CircularProgress, TextField } from '@/components/mui';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { useActions } from '@/hooks/useActionts';
import { selectAuth } from '@/store/slices/auth/selectors';

import { LoginWrapper, RegisterBlock } from './style';
import type { LoginForm, LoginPageProps } from './types';
import { loginSchema } from './validation';

export const LoginPage = ({ params: { locale } }: LoginPageProps) => {
    const t = useTranslations('login-form');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: 'onTouched',
        resolver: yupResolver(loginSchema),
    });
    const { login } = useActions();
    const { isLoading, error, authorized } = useAppSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (authorized) router.replace('/');
    }, [authorized]);

    const onSubmit = handleSubmit(({ password, usernameOrEmail }, event) => {
        event?.preventDefault();
        login({ usernameOrEmail, password });
    });

    return (
        <LoginWrapper>
            <form onSubmit={onSubmit} method="POST">
                <TextField
                    {...register('usernameOrEmail')}
                    label={t('username')}
                    variant="filled"
                    helperText={errors.usernameOrEmail && t('login-error')}
                    error={!!errors.usernameOrEmail}
                />
                <TextField
                    {...register('password')}
                    label={t('password')}
                    type="password"
                    variant="filled"
                    helperText={errors.password && t('password-error')}
                    error={!!errors.password}
                />

                {error && (
                    <Alert variant="outlined" severity="error">
                        {t('wrong')}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : t('sign-in')}
                </Button>

                <RegisterBlock>
                    {t('to-register-text')}&nbsp;
                    <Link href={`/${locale}/register`}>{t('to-register')}</Link>
                </RegisterBlock>
            </form>
        </LoginWrapper>
    );
};
