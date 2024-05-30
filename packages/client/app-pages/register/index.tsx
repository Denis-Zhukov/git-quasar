'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, CircularProgress, TextField } from '@/components/mui';
import { useAuthRedirect } from '@/hooks/auth-redirect';
import { useRegisterMutation } from '@/store/quries/auth';

import { LoginBlock, RegisterWrapper, WordWrapBlock } from './style';
import type { RegisterForm, RegisterPageProps } from './types';
import { generateRegisterSchema } from './validation';

export const RegisterPage = ({ params: { locale } }: RegisterPageProps) => {
    useAuthRedirect();
    const t = useTranslations('register-form');
    const [send, { isLoading, isSuccess }] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(generateRegisterSchema(t)),
        mode: 'onTouched',
    });
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) router.push(`/${locale}/confirm-email`);
    }, [isSuccess]);

    const { onBlur, ...passwordProps } = register('password');
    const handlePasswordBlur = (...args: Parameters<typeof onBlur>) => {
        onBlur(...args);
        trigger('confirmPassword');
    };

    const onSubmit = handleSubmit(({ username, email, password }) => {
        send({ username, email, password });
    });

    return (
        <RegisterWrapper>
            <form onSubmit={onSubmit}>
                <TextField
                    {...register('username')}
                    label={t('username.label')}
                    helperText={
                        <WordWrapBlock>
                            {errors.username?.message}
                        </WordWrapBlock>
                    }
                    error={!!errors.username}
                />
                <TextField
                    {...register('email')}
                    label={t('email.label')}
                    helperText={errors.email?.message}
                    error={!!errors.email}
                />
                <TextField
                    {...passwordProps}
                    onBlur={handlePasswordBlur}
                    label={t('password.label')}
                    helperText={
                        <WordWrapBlock>
                            {errors.password?.message}
                        </WordWrapBlock>
                    }
                    error={!!errors.password}
                />
                <TextField
                    {...register('confirmPassword')}
                    label={t('confirm-password.label')}
                    helperText={errors.confirmPassword?.message}
                    error={!!errors.confirmPassword}
                />

                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : t('sign-up')}
                </Button>

                <LoginBlock>
                    {t('to-login-text')}&nbsp;
                    <Link href={`/${locale}/login`}>{t('to-login')}</Link>
                </LoginBlock>
            </form>
        </RegisterWrapper>
    );
};
